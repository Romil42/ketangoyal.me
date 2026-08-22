const CAPABILITIES = ["Brand", "Web", "Content", "Automation", "Marketing", "Growth"];
const PROCESS = ["Discover", "Design", "Build", "Launch", "Grow"];

export default function KrafttVisionModel() {
  return (
    <div
      className="vision-model"
      role="img"
      aria-label="An animated three-dimensional Kraftt Digital systems model connecting brand, web, content, automation, marketing, and growth"
    >
      <div className="vision-model__header" aria-hidden="true">
        <span className="meta-mono">KRAFTT / SYSTEM MAP</span>
        <span className="vision-model__status meta-mono">
          <span /> LIVE
        </span>
      </div>

      <div className="vision-model__stage" aria-hidden="true">
        <div className="vision-model__ring vision-model__ring--one">
          <span className="vision-model__node vision-model__node--one" />
        </div>
        <div className="vision-model__ring vision-model__ring--two">
          <span className="vision-model__node vision-model__node--two" />
        </div>
        <div className="vision-model__ring vision-model__ring--three">
          <span className="vision-model__node vision-model__node--three" />
        </div>

        <div className="vision-model__cube-wrap">
          <div className="vision-model__cube">
            <span className="vision-model__face vision-model__face--front">
              <strong>KRAFTT</strong>
              <small>DIGITAL</small>
            </span>
            <span className="vision-model__face vision-model__face--back">SYSTEMS</span>
            <span className="vision-model__face vision-model__face--right">GROW</span>
            <span className="vision-model__face vision-model__face--left">BUILD</span>
            <span className="vision-model__face vision-model__face--top">01</span>
            <span className="vision-model__face vision-model__face--bottom">KD</span>
          </div>
        </div>

        {CAPABILITIES.map((capability, index) => (
          <span
            key={capability}
            className={`vision-model__satellite vision-model__satellite--${index + 1}`}
          >
            <i />
            {capability}
          </span>
        ))}
      </div>

      <div className="vision-model__process" aria-hidden="true">
        {PROCESS.map((step, index) => (
          <div key={step} className={index === PROCESS.length - 1 ? "is-active" : ""}>
            <span>{step}</span>
            {index < PROCESS.length - 1 ? <b>→</b> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
