import { useState } from "react";

type Appointment = {
  id: number;
  service: string;
  professional: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  cancelReason?: string;
};

const SERVICES = [
  "Consulta Médica",
  "Exame Laboratorial",
  "Fisioterapia",
  "Nutrição",
  "Psicologia",
  "Odontologia",
];

const PROFESSIONALS = [
  "Dra. Camila Torres",
  "Dr. Rafael Mendes",
  "Dra. Beatriz Costa",
  "Dr. Lucas Ferreira",
  "Dra. Ana Lima",
];

const TIMES = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmado",
  pending: "Pendente",
  cancelled: "Cancelado",
};

const STATUS_COLOR: Record<string, string> = {
  confirmed: "bg-gray-100 text-gray-800 border border-gray-300",
  pending: "bg-gray-50 text-gray-600 border border-gray-300",
  cancelled: "bg-gray-200 text-gray-500 border border-gray-300",
};

const initialAppointments: Appointment[] = [
  { id: 1, service: "Consulta Médica", professional: "Dra. Camila Torres", date: "2026-09-15", time: "10:00", status: "confirmed" },
  { id: 2, service: "Fisioterapia", professional: "Dr. Rafael Mendes", date: "2026-09-18", time: "14:00", status: "pending" },
  { id: 3, service: "Nutrição", professional: "Dra. Beatriz Costa", date: "2026-09-10", time: "09:00", status: "confirmed" },
];

type Tab = "agendar" | "meus-agendamentos";

type Toast = { type: "success" | "error"; message: string } | null;

type ConfirmDialog = { id: number; service: string; date: string; time: string; reason: string } | null;

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#0A0A0A" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertTriangleIcon({ color = "#1A1A1A" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L2 20h20L12 3z" fill={color} />
      <path d="M12 9v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="#fff" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ── Toast ── */
function ToastBanner({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="animate-slide-up fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border"
      style={{
        background: isSuccess ? "#EFEFEF" : "#EFEFEF",
        borderColor: isSuccess ? "#C8C8C8" : "#D4D4D4",
        color: isSuccess ? "#0A0A0A" : "#0A0A0A",
        minWidth: 320,
        maxWidth: 480,
      }}
    >
      {isSuccess ? <CheckCircleIcon /> : <AlertTriangleIcon color="#1A1A1A" />}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={onClose}
        aria-label="Fechar notificação"
        className="ml-2 text-lg leading-none opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

const MAX_REASON = 250;

/* ── Confirm Delete Dialog ── */
function ConfirmDialog({
  dialog,
  onCancel,
  onConfirm,
}: {
  dialog: ConfirmDialog;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  if (!dialog) return null;
  const remaining = MAX_REASON - reason.length;
  const nearLimit = remaining <= 30;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(10,10,10,0.45)", backdropFilter: "blur(2px)" }}
    >
      <div className="animate-scale-in bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#EFEFEF" }}>
            <AlertTriangleIcon color="#1A1A1A" />
          </div>
        </div>

        <h2 id="confirm-title" className="text-center text-lg font-semibold mb-2" style={{ color: "#0A0A0A", fontFamily: "var(--font-sans)" }}>
          Cancelar agendamento?
        </h2>
        <p id="confirm-desc" className="text-center text-sm mb-1" style={{ color: "#666666" }}>
          Você está prestes a cancelar:
        </p>
        <div className="text-center text-sm font-medium mb-4" style={{ color: "#0A0A0A" }}>
          <div>{dialog.service}</div>
          <div style={{ color: "#666666" }}>
            {formatDate(dialog.date)} às {dialog.time}
          </div>
        </div>

        {/* IHC: Prevenção de erros — mensagem de alerta antes de ação destrutiva */}
        <div className="flex items-start gap-2 rounded-lg p-3 mb-4 text-xs" style={{ background: "#EFEFEF", color: "#444444" }}>
          <span className="text-base leading-none mt-0.5">⚠️</span>
          <span>Esta ação não pode ser desfeita. O agendamento será cancelado permanentemente.</span>
        </div>

        {/* CCB-2026-001: campo de motivo do cancelamento */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label htmlFor="cancel-reason" className="text-sm font-medium" style={{ color: "#0A0A0A" }}>
            Motivo do cancelamento{" "}
            <span className="font-normal" style={{ color: "#666666" }}>(opcional)</span>
          </label>
          <textarea
            id="cancel-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, MAX_REASON))}
            rows={3}
            placeholder="Ex.: conflito de horário, indisponibilidade do profissional..."
            className="w-full rounded-lg border px-3 py-2.5 text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ borderColor: "#D4D4D4", color: "#0A0A0A" }}
            aria-describedby="reason-counter"
          />
          <div className="flex justify-end">
            <span
              id="reason-counter"
              className="text-xs"
              aria-live="polite"
              style={{ color: nearLimit ? "#B45309" : "#666666" }}
            >
              {remaining} caractere{remaining !== 1 ? "s" : ""} restante{remaining !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            autoFocus
            className="flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer hover:bg-gray-50"
            style={{ borderColor: "#D4D4D4", color: "#0A0A0A" }}
          >
            Manter agendamento
          </button>
          <button
            onClick={() => onConfirm(reason.trim())}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-opacity cursor-pointer hover:opacity-90"
            style={{ background: "#1A1A1A", color: "#FFFFFF" }}
          >
            Sim, cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Appointment Card ── */
function AppointmentCard({
  appt,
  onDelete,
}: {
  appt: Appointment;
  onDelete: (appt: Appointment) => void;
}) {
  return (
    <article
      className="bg-white rounded-xl border p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
      style={{ borderColor: "#D4D4D4" }}
      aria-label={`Agendamento: ${appt.service} em ${formatDate(appt.date)}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base" style={{ color: "#0A0A0A" }}>
            {appt.service}
          </h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_COLOR[appt.status]}`}>
          {STATUS_LABEL[appt.status]}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-sm" style={{ color: "#666666" }}>
        <div className="flex items-center gap-2">
          <UserIcon />
          <span>{appt.professional}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span>{formatDate(appt.date)}</span>
          <ClockIcon />
          <span>{appt.time}</span>
        </div>
      </div>

      {appt.status === "cancelled" && appt.cancelReason ? (
        <div className="pt-2 border-t" style={{ borderColor: "#E8E8E8" }}>
          <p className="text-xs" style={{ color: "#666666" }}>
            <span className="font-medium" style={{ color: "#0A0A0A" }}>Motivo: </span>
            {appt.cancelReason}
          </p>
        </div>
      ) : appt.status !== "cancelled" ? (
        <div className="pt-1 border-t" style={{ borderColor: "#E8E8E8" }}>
          <button
            onClick={() => onDelete(appt)}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer hover:text-gray-900"
            style={{ color: "#1A1A1A" }}
            aria-label={`Cancelar agendamento de ${appt.service} em ${formatDate(appt.date)}`}
          >
            <TrashIcon />
            Cancelar agendamento
          </button>
        </div>
      ) : null}
    </article>
  );
}

/* ── Booking Form ── */
function BookingForm({ onBooked }: { onBooked: (appt: Omit<Appointment, "id" | "status">) => void }) {
  const [form, setForm] = useState({ service: "", professional: "", date: "", time: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const e: Record<string, string> = {};
    if (!form.service) e.service = "Selecione um serviço.";
    if (!form.professional) e.professional = "Selecione um profissional.";
    if (!form.date) e.date = "Informe a data do agendamento.";
    else if (form.date < today) e.date = "A data não pode ser no passado.";
    if (!form.time) e.time = "Selecione um horário disponível.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const booked = { ...form };
      setForm({ service: "", professional: "", date: "", time: "" });
      onBooked(booked);
    }, 1200);
  }

  function field(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  const inputBase =
    "w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const inputStyle = (err?: string) =>
    `${inputBase} ${err ? "border-gray-400 focus:ring-gray-400" : "border-[#D4D4D4] focus:ring-[#0A0A0A]"}`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de agendamento" className="flex flex-col gap-5">
      {/* IHC: Prevenção de erros — validação em tempo real e mensagens de campo */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Serviço */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-sm font-medium" style={{ color: "#0A0A0A" }}>
            Serviço <span aria-hidden="true" style={{ color: "#1A1A1A" }}>*</span>
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => field("service", e.target.value)}
            className={inputStyle(errors.service)}
            aria-required="true"
            aria-describedby={errors.service ? "service-error" : undefined}
            aria-invalid={!!errors.service}
            style={{ color: form.service ? "#0A0A0A" : "#666666" }}
          >
            <option value="">Selecione um serviço</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && (
            <span id="service-error" role="alert" className="text-xs" style={{ color: "#1A1A1A" }}>
              ⚠ {errors.service}
            </span>
          )}
        </div>

        {/* Profissional */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="professional" className="text-sm font-medium" style={{ color: "#0A0A0A" }}>
            Profissional <span aria-hidden="true" style={{ color: "#1A1A1A" }}>*</span>
          </label>
          <select
            id="professional"
            value={form.professional}
            onChange={(e) => field("professional", e.target.value)}
            className={inputStyle(errors.professional)}
            aria-required="true"
            aria-describedby={errors.professional ? "professional-error" : undefined}
            aria-invalid={!!errors.professional}
            style={{ color: form.professional ? "#0A0A0A" : "#666666" }}
          >
            <option value="">Selecione um profissional</option>
            {PROFESSIONALS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.professional && (
            <span id="professional-error" role="alert" className="text-xs" style={{ color: "#1A1A1A" }}>
              ⚠ {errors.professional}
            </span>
          )}
        </div>

        {/* Data */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-sm font-medium" style={{ color: "#0A0A0A" }}>
            Data <span aria-hidden="true" style={{ color: "#1A1A1A" }}>*</span>
          </label>
          <input
            id="date"
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => field("date", e.target.value)}
            className={inputStyle(errors.date)}
            aria-required="true"
            aria-describedby={errors.date ? "date-error" : "date-hint"}
            aria-invalid={!!errors.date}
          />
          {errors.date ? (
            <span id="date-error" role="alert" className="text-xs" style={{ color: "#1A1A1A" }}>
              ⚠ {errors.date}
            </span>
          ) : (
            <span id="date-hint" className="text-xs" style={{ color: "#666666" }}>
              Somente datas a partir de hoje
            </span>
          )}
        </div>

        {/* Horário */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="time" className="text-sm font-medium" style={{ color: "#0A0A0A" }}>
            Horário <span aria-hidden="true" style={{ color: "#1A1A1A" }}>*</span>
          </label>
          <select
            id="time"
            value={form.time}
            onChange={(e) => field("time", e.target.value)}
            className={inputStyle(errors.time)}
            aria-required="true"
            aria-describedby={errors.time ? "time-error" : undefined}
            aria-invalid={!!errors.time}
            style={{ color: form.time ? "#0A0A0A" : "#666666" }}
          >
            <option value="">Selecione um horário</option>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.time && (
            <span id="time-error" role="alert" className="text-xs" style={{ color: "#1A1A1A" }}>
              ⚠ {errors.time}
            </span>
          )}
        </div>
      </div>

      {/* Required fields note */}
      <p className="text-xs" style={{ color: "#666666" }}>
        <span style={{ color: "#1A1A1A" }}>*</span> Campos obrigatórios
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ background: "#0A0A0A", color: "#FFFFFF" }}
        aria-live="polite"
        aria-label={submitting ? "Processando seu agendamento..." : "Confirmar agendamento"}
      >
        {submitting ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
              <path d="M12 3a9 9 0 019 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Processando...
          </>
        ) : (
          <>
            <CalendarIcon />
            Confirmar agendamento
          </>
        )}
      </button>
    </form>
  );
}

/* ── Main App ── */
export default function App() {
  const [tab, setTab] = useState<Tab>("agendar");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [toast, setToast] = useState<Toast>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>(null);
  const [nextId, setNextId] = useState(4);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  }

  function handleBooked(appt: Omit<Appointment, "id" | "status">) {
    setAppointments((prev) => [
      ...prev,
      { id: nextId, ...appt, status: "confirmed" },
    ]);
    setNextId((n) => n + 1);
    /* IHC: Feedback ao usuário — confirmação explícita de agendamento realizado */
    showToast("success", "✓ Agendamento realizado com sucesso! Você receberá uma confirmação por e-mail.");
    setTab("meus-agendamentos");
  }

  function handleDeleteRequest(appt: Appointment) {
    /* IHC: Prevenção de erros — confirmação antes de excluir */
    setConfirmDialog({ id: appt.id, service: appt.service, date: appt.date, time: appt.time, reason: "" });
  }

  function handleDeleteConfirm(reason: string) {
    setAppointments((prev) =>
      prev.map((a) => a.id === confirmDialog!.id ? { ...a, status: "cancelled" as const, cancelReason: reason || undefined } : a)
    );
    setConfirmDialog(null);
    showToast("success", "Agendamento cancelado. Se precisar, você pode reagendar a qualquer momento.");
  }

  const activeCount = appointments.filter((a) => a.status !== "cancelled").length;

  return (
    <div className="min-h-full flex flex-col" style={{ background: "#F5F5F5" }}>
      {/* Toast — IHC: Feedback ao usuário */}
      <ToastBanner toast={toast} onClose={() => setToast(null)} />

      {/* Confirm Dialog — IHC: Prevenção de erros */}
      <ConfirmDialog dialog={confirmDialog} onCancel={() => setConfirmDialog(null)} onConfirm={(r) => handleDeleteConfirm(r)} />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(245,245,245,0.95)", borderColor: "#D4D4D4", backdropFilter: "blur(8px)" }}
        role="banner"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "#0A0A0A" }}
            aria-hidden="true"
          >
            AF
          </div>
          <div>
            <span className="font-semibold text-base" style={{ color: "#0A0A0A", fontFamily: "var(--font-serif)" }}>
              AgendaFácil
            </span>
            <span
              className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block"
              style={{ background: "#EFEFEF", color: "#0A0A0A" }}
            >
              Sistema de Agendamentos
            </span>
          </div>
        </div>

        {/* User badge */}
        <div className="flex items-center gap-2 text-sm" style={{ color: "#666666" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: "#0A0A0A" }}
            aria-label="Usuário logado: Maria Silva"
          >
            MS
          </div>
          <span className="hidden sm:block">Maria Silva</span>
        </div>
      </header>

      {/* IHC: Melhor organização da navegação — abas claras com estado ativo */}
      <nav
        aria-label="Navegação principal"
        className="px-6 pt-6 flex gap-1 border-b"
        style={{ borderColor: "#D4D4D4" }}
      >
        {(["agendar", "meus-agendamentos"] as Tab[]).map((t) => {
          const isActive = tab === t;
          const label = t === "agendar" ? "Novo agendamento" : `Meus agendamentos`;
          const badge = t === "meus-agendamentos" ? activeCount : null;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t}`}
              className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors cursor-pointer"
              style={{
                color: isActive ? "#0A0A0A" : "#666666",
                background: isActive ? "#FFFFFF" : "transparent",
                borderBottom: isActive ? "2px solid #0A0A0A" : "2px solid transparent",
              }}
            >
              {label}
              {badge !== null && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: isActive ? "#EFEFEF" : "#E8E8E8", color: isActive ? "#0A0A0A" : "#666666" }}
                  aria-label={`${badge} agendamentos ativos`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full" id={`panel-${tab}`} role="tabpanel">
        {tab === "agendar" ? (
          <div className="animate-slide-up">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1" style={{ color: "#0A0A0A", fontFamily: "var(--font-serif)" }}>
                Novo agendamento
              </h1>
              <p className="text-sm" style={{ color: "#666666" }}>
                Preencha os campos abaixo para agendar seu atendimento.
              </p>
            </div>

            {/* IHC: Acessibilidade — fieldset agrupado, labels associados, aria-required */}
            <fieldset
              className="bg-white rounded-2xl border p-6 shadow-sm"
              style={{ borderColor: "#D4D4D4" }}
              aria-label="Dados do agendamento"
            >
              <legend className="sr-only">Dados do agendamento</legend>
              <BookingForm onBooked={handleBooked} />
            </fieldset>

            {/* Info box */}
            <div
              className="mt-4 flex items-start gap-3 rounded-xl p-4 text-sm border"
              style={{ background: "#EFEFEF", borderColor: "#C8C8C8", color: "#0A0A0A" }}
              role="note"
              aria-label="Informação sobre confirmação"
            >
              <span className="text-lg leading-none mt-0.5" aria-hidden="true">ℹ️</span>
              <span>
                Após confirmar, você receberá um e-mail com os detalhes do agendamento. Caso precise cancelar, acesse a aba{" "}
                <strong>Meus agendamentos</strong>.
              </span>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: "#0A0A0A", fontFamily: "var(--font-serif)" }}>
                  Meus agendamentos
                </h1>
                <p className="text-sm" style={{ color: "#666666" }}>
                  {activeCount > 0
                    ? `Você tem ${activeCount} agendamento${activeCount > 1 ? "s" : ""} ativo${activeCount > 1 ? "s" : ""}.`
                    : "Você não possui agendamentos ativos."}
                </p>
              </div>
              <button
                onClick={() => setTab("agendar")}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity cursor-pointer hover:opacity-90"
                style={{ background: "#0A0A0A", color: "#FFFFFF" }}
              >
                <span aria-hidden="true">+</span> Novo
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-16 text-sm" style={{ color: "#666666" }}>
                Nenhum agendamento encontrado.
              </div>
            ) : (
              <div className="flex flex-col gap-4" role="list" aria-label="Lista de agendamentos">
                {appointments.map((a) => (
                  <div key={a.id} role="listitem">
                    <AppointmentCard appt={a} onDelete={handleDeleteRequest} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="px-6 py-4 text-center text-xs border-t"
        style={{ color: "#666666", borderColor: "#D4D4D4" }}
        role="contentinfo"
      >
        AgendaFácil © 2026 — Dúvidas? Ligue para{" "}
        <a href="tel:08000000000" className="underline hover:text-gray-900 transition-colors" style={{ color: "#0A0A0A" }}>
          0800 000 0000
        </a>
      </footer>
    </div>
  );
}
