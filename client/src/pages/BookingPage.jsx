import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { publicApi } from '../api/public'

const emptyForm = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  pickup_location: '',
  dropoff_location: '',
  pickup_date: '',
  pickup_time: '',
  route_id: '',
  car_id: '',
  passenger_count: 1,
  luggage_count: 0,
  special_instructions: '',
  has_multiple_stops: false,
  stops: [''],
  flight_number: '',
  airline_name: '',
  flight_type: 'arrival',
  scheduled_time: '',
}

export default function BookingPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [cars, setCars] = useState([])
  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [price, setPrice] = useState(null)
  const [priceError, setPriceError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [stepError, setStepError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const steps = [
    { id: 1, label: t.booking.stepRide },
    { id: 2, label: t.booking.stepLocation },
    { id: 3, label: t.booking.stepContact },
  ]

  const selectedRoute = useMemo(
    () => routes.find((route) => String(route.id) === String(form.route_id)),
    [routes, form.route_id],
  )
  const selectedCar = useMemo(
    () => cars.find((car) => String(car.id) === String(form.car_id)),
    [cars, form.car_id],
  )

  const needsFlight = Boolean(selectedRoute?.origin?.toLowerCase().includes('airport'))
  const canAddStops = selectedRoute?.route_type === 'standard'

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [carList, routeList] = await Promise.all([publicApi.cars(), publicApi.routes()])
        if (!alive) return
        setCars(Array.isArray(carList) ? carList : [])
        setRoutes(Array.isArray(routeList) ? routeList : [])
      } catch {
        if (alive) setLoadError(t.booking.loadError)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [t.booking.loadError])

  useEffect(() => {
    if (!form.car_id || !form.route_id) {
      setPrice(null)
      setPriceError('')
      return
    }

    let alive = true
    ;(async () => {
      try {
        const pricing = await publicApi.pricing(form.car_id, form.route_id)
        if (!alive) return
        setPrice(pricing.price)
        setPriceError('')
      } catch {
        if (!alive) return
        setPrice(null)
        setPriceError(t.booking.noPrice)
      }
    })()

    return () => {
      alive = false
    }
  }, [form.car_id, form.route_id, t.booking.noPrice])

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateStop(index, value) {
    setForm((prev) => {
      const stops = [...prev.stops]
      stops[index] = value
      return { ...prev, stops }
    })
  }

  function validateStep(current) {
    if (current === 1) {
      if (!form.route_id || !form.car_id) return t.booking.stepRideError
      if (!price) return priceError || t.booking.noPrice
      if (!form.passenger_count || Number(form.passenger_count) < 1) return t.booking.stepRideError
      return ''
    }

    if (current === 2) {
      if (!form.pickup_location.trim() || !form.dropoff_location.trim()) return t.booking.stepLocationError
      if (!form.pickup_date || !form.pickup_time) return t.booking.stepLocationError
      if (form.has_multiple_stops && canAddStops) {
        const stops = form.stops.map((s) => s.trim()).filter(Boolean)
        if (!stops.length) return t.booking.stepLocationError
      }
      if (needsFlight) {
        const flightNumber = form.flight_number.trim()
        const airlineName = form.airline_name.trim()
        const scheduledTime = form.scheduled_time
        const anyFlight = Boolean(flightNumber || airlineName || scheduledTime)
        const allFlight = Boolean(flightNumber && airlineName && scheduledTime)
        if (anyFlight && !allFlight) return t.booking.flightIncomplete
      }
      return ''
    }

    if (current === 3) {
      if (!form.customer_name.trim() || !form.customer_phone.trim() || !form.customer_email.trim()) {
        return t.booking.stepContactError
      }
      return ''
    }

    return ''
  }

  function goNext() {
    const error = validateStep(step)
    setStepError(error)
    if (error) return
    setStep((prev) => Math.min(3, prev + 1))
  }

  function goBack() {
    setStepError('')
    setSubmitError('')
    setStep((prev) => Math.max(1, prev - 1))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const error = validateStep(3)
    setStepError(error)
    setSubmitError('')
    setSuccess(false)
    if (error) return

    if (!price) {
      setSubmitError(priceError || t.booking.noPrice)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        route_id: Number(form.route_id),
        car_id: Number(form.car_id),
        customer_name: form.customer_name.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_email: form.customer_email.trim(),
        pickup_location: form.pickup_location.trim(),
        dropoff_location: form.dropoff_location.trim(),
        pickup_date: form.pickup_date,
        pickup_time: form.pickup_time,
        passenger_count: Number(form.passenger_count),
        luggage_count: Number(form.luggage_count) || 0,
        special_instructions: form.special_instructions.trim() || null,
        price: Number(price),
        has_multiple_stops: Boolean(canAddStops && form.has_multiple_stops),
      }

      if (payload.has_multiple_stops) {
        payload.booking_stops_attributes = form.stops
          .map((stop) => stop.trim())
          .filter(Boolean)
          .map((stop_location, index) => ({
            stop_location,
            sequence_order: index + 1,
          }))
      }

      if (needsFlight) {
        const flightNumber = form.flight_number.trim()
        const airlineName = form.airline_name.trim()
        const scheduledTime = form.scheduled_time
        if (flightNumber && airlineName && scheduledTime) {
          payload.flight_detail_attributes = {
            flight_number: flightNumber,
            airline_name: airlineName,
            flight_type: form.flight_type,
            scheduled_time: scheduledTime,
          }
        }
      }

      await publicApi.createBooking(payload)
      setSuccess(true)
      setForm(emptyForm)
      setPrice(null)
      setStep(1)
    } catch (err) {
      setSubmitError(err.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="booking-page">
      <header className="booking-page__header">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🕋</span>
          <span className="header__logo-text">SaudiRides</span>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="booking-page__main">
        <h1 className="booking-page__title">{t.booking.title}</h1>
        <p className="booking-page__subtitle">{t.booking.subtitle}</p>

        {!loading && !loadError ? (
          <ol className="booking-steps" aria-label="Booking progress">
            {steps.map((item) => (
              <li
                key={item.id}
                className={`booking-steps__item${step === item.id ? ' is-active' : ''}${
                  step > item.id ? ' is-done' : ''
                }`}
              >
                <span className="booking-steps__num">{item.id}</span>
                <span className="booking-steps__label">{item.label}</span>
              </li>
            ))}
          </ol>
        ) : null}

        {loading ? <p className="booking-form__note">…</p> : null}
        {loadError ? <p className="booking-form__error">{loadError}</p> : null}
        {success ? <p className="booking-form__success">{t.booking.success}</p> : null}
        {stepError ? <p className="booking-form__error">{stepError}</p> : null}
        {submitError ? <p className="booking-form__error">{submitError}</p> : null}

        {!loading && !loadError ? (
          <form className="booking-form" onSubmit={onSubmit} noValidate>
            {step === 1 ? (
              <>
                <div className="booking-form__field">
                  <label htmlFor="route">{t.booking.route}</label>
                  <select
                    id="route"
                    value={form.route_id}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        route_id: e.target.value,
                        has_multiple_stops: false,
                        stops: [''],
                      }))
                    }
                  >
                    <option value="">—</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="booking-form__field">
                  <label htmlFor="vehicle">{t.booking.vehicle}</label>
                  <select
                    id="vehicle"
                    value={form.car_id}
                    onChange={(e) => update('car_id', e.target.value)}
                  >
                    <option value="">—</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name} ({car.car_type}, {car.capacity} seats)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="booking-form__field">
                  <label htmlFor="passengers">{t.booking.passengers}</label>
                  <input
                    id="passengers"
                    type="number"
                    min="1"
                    value={form.passenger_count}
                    onChange={(e) => update('passenger_count', e.target.value)}
                  />
                </div>
                <div className="booking-form__price-card">
                  <span>{t.booking.price}</span>
                  <strong>{price != null ? `SAR ${price}` : priceError || '—'}</strong>
                  {selectedRoute && selectedCar ? (
                    <p>
                      {selectedCar.name} · {selectedRoute.name}
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="booking-form__field">
                  <label htmlFor="pickup">{t.booking.pickup}</label>
                  <input
                    id="pickup"
                    type="text"
                    value={form.pickup_location}
                    onChange={(e) => update('pickup_location', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="dropoff">{t.booking.dropoff}</label>
                  <input
                    id="dropoff"
                    type="text"
                    value={form.dropoff_location}
                    onChange={(e) => update('dropoff_location', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="date">{t.booking.date}</label>
                  <input
                    id="date"
                    type="date"
                    value={form.pickup_date}
                    onChange={(e) => update('pickup_date', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="time">{t.booking.time}</label>
                  <input
                    id="time"
                    type="time"
                    value={form.pickup_time}
                    onChange={(e) => update('pickup_time', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="luggage">{t.booking.luggage}</label>
                  <input
                    id="luggage"
                    type="number"
                    min="0"
                    value={form.luggage_count}
                    onChange={(e) => update('luggage_count', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="instructions">{t.booking.instructions}</label>
                  <textarea
                    id="instructions"
                    rows="3"
                    value={form.special_instructions}
                    onChange={(e) => update('special_instructions', e.target.value)}
                  />
                </div>

                {canAddStops ? (
                  <>
                    <label className="booking-form__check">
                      <input
                        type="checkbox"
                        checked={form.has_multiple_stops}
                        onChange={(e) => update('has_multiple_stops', e.target.checked)}
                      />
                      {t.booking.multipleStops}
                    </label>
                    {form.has_multiple_stops ? (
                      <div className="booking-form__stops">
                        {form.stops.map((stop, index) => (
                          <div className="booking-form__field" key={`stop-${index}`}>
                            <label htmlFor={`stop-${index}`}>
                              {t.booking.stop} {index + 1}
                            </label>
                            <input
                              id={`stop-${index}`}
                              type="text"
                              value={stop}
                              onChange={(e) => updateStop(index, e.target.value)}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn--sm booking-form__add-stop"
                          onClick={() => setForm((prev) => ({ ...prev, stops: [...prev.stops, ''] }))}
                        >
                          {t.booking.addStop}
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {needsFlight ? (
                  <>
                    <div className="booking-form__field">
                      <label htmlFor="flight_number">{t.booking.flightNumber} ({t.booking.optional})</label>
                      <input
                        id="flight_number"
                        type="text"
                        value={form.flight_number}
                        onChange={(e) => update('flight_number', e.target.value)}
                      />
                    </div>
                    <div className="booking-form__field">
                      <label htmlFor="airline">{t.booking.airline}</label>
                      <input
                        id="airline"
                        type="text"
                        value={form.airline_name}
                        onChange={(e) => update('airline_name', e.target.value)}
                      />
                    </div>
                    <div className="booking-form__field">
                      <label htmlFor="flight_type">{t.booking.flightType}</label>
                      <select
                        id="flight_type"
                        value={form.flight_type}
                        onChange={(e) => update('flight_type', e.target.value)}
                      >
                        <option value="arrival">{t.booking.arrival}</option>
                        <option value="departure">{t.booking.departure}</option>
                      </select>
                    </div>
                    <div className="booking-form__field">
                      <label htmlFor="scheduled_time">{t.booking.flightTime}</label>
                      <input
                        id="scheduled_time"
                        type="datetime-local"
                        value={form.scheduled_time}
                        onChange={(e) => update('scheduled_time', e.target.value)}
                      />
                    </div>
                  </>
                ) : null}
              </>
            ) : null}

            {step === 3 ? (
              <>
                <div className="booking-form__summary">
                  <p>
                    <strong>{selectedCar?.name}</strong> · {selectedRoute?.name}
                  </p>
                  <p>
                    {t.booking.price}: <strong>SAR {price}</strong>
                  </p>
                </div>
                <div className="booking-form__field">
                  <label htmlFor="name">{t.booking.name}</label>
                  <input
                    id="name"
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => update('customer_name', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="phone">{t.booking.phone}</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.customer_phone}
                    onChange={(e) => update('customer_phone', e.target.value)}
                  />
                </div>
                <div className="booking-form__field">
                  <label htmlFor="email">{t.booking.email}</label>
                  <input
                    id="email"
                    type="email"
                    value={form.customer_email}
                    onChange={(e) => update('customer_email', e.target.value)}
                  />
                </div>
              </>
            ) : null}

            <div className={`booking-form__actions${step === 1 ? ' booking-form__actions--single' : ''}`}>
              {step > 1 ? (
                <button type="button" className="btn btn--lg booking-form__back-btn" onClick={goBack}>
                  {t.booking.backStep}
                </button>
              ) : null}

              {step < 3 ? (
                <button type="button" className="btn btn--primary btn--lg booking-form__continue" onClick={goNext}>
                  {t.booking.nextStep}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn--primary btn--lg booking-form__continue"
                  disabled={submitting}
                >
                  {submitting ? t.booking.submitting : t.booking.submit}
                </button>
              )}
            </div>
          </form>
        ) : null}

        <Link to="/" className="booking-page__back">
          ← {t.booking.back}
        </Link>
      </main>
    </div>
  )
}
