const VAN_TILT_BASE_URL = new URL('.', import.meta.url).href;

class VanTiltCard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Van Tilt">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector('div');
    }

    const formatAngle = (state) => {
      const n = parseFloat(state);
      return Number.isFinite(n) ? n.toFixed(1) : state;
    };

    const entityX = this.config.entity_x;
    const xAngle = hass.states[entityX];
    const xAngleStr = formatAngle(xAngle ? xAngle.state : 'unavailable');

    const entityY = this.config.entity_y;
    const yAngle = hass.states[entityY];
    const yAngleStr = formatAngle(yAngle ? yAngle.state : 'unavailable');

    const clampRotate = (state) => {
      const n = parseFloat(state) * 3;
      return Math.max(-45, Math.min(45, n)).toString();
    };

    const xRotate = clampRotate(xAngleStr);
    const yRotate = clampRotate(yAngleStr);

    this.content.innerHTML = `
      <row style="display: flex;">
        <div style="flex: 50%;text-align: center;">
          <img src="${VAN_TILT_BASE_URL}img/promaster_side.png" style="max-width: 100%;height: 100px;transform:rotate(${yRotate}deg);">
          <hr>
          <h1>${yAngleStr}°</h1>
        </div>
        <div style="flex: 50%;text-align: center;">
          <img src="${VAN_TILT_BASE_URL}img/promaster_back.png" style="max-width: 100%;height: 100px;transform:rotate(${xRotate}deg);">
          <hr>
          <h1>${xAngleStr}°</h1>
        </div>
      </row>
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    if (!config.entity_x) {
      throw new Error('You need to define an entity_x');
    }
    if (!config.entity_y) {
      throw new Error('You need to define an entity_y');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('van-tilt-card', VanTiltCard);

