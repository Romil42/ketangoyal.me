export default function BuildModel() {
  return (
    <div
      className="build-model"
      role="img"
      aria-label="An abstract rotating three-dimensional model built from modular faces"
    >
      <span className="build-model__label meta-mono" aria-hidden="true">
        BUILD / 01
      </span>

      <div className="build-model__orbit build-model__orbit--wide" aria-hidden="true" />
      <div className="build-model__orbit build-model__orbit--tall" aria-hidden="true" />

      <div className="build-model__scene" aria-hidden="true">
        <div className="build-model__cube">
          <span className="build-model__face build-model__face--front">BUILD</span>
          <span className="build-model__face build-model__face--back">TEST</span>
          <span className="build-model__face build-model__face--right">LEARN</span>
          <span className="build-model__face build-model__face--left">MAKE</span>
          <span className="build-model__face build-model__face--top">01</span>
          <span className="build-model__face build-model__face--bottom">KG</span>
        </div>
      </div>

      <span className="build-model__coordinate build-model__coordinate--top meta-mono" aria-hidden="true">
        X 24.7
      </span>
      <span className="build-model__coordinate build-model__coordinate--bottom meta-mono" aria-hidden="true">
        CURIOUS → BUILT
      </span>
    </div>
  );
}
