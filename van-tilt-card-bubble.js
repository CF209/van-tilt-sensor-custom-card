class VanTiltCardBubble extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    const title = this.config.title ? this.config.title : "Van Tilt";
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="${title}">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }
    var levelSize = this.config.size ? parseFloat(this.config.size) : 400;

    var element = document.getElementById("vtcbubble");
    if (element) {
      // never found
      var positionInfo = element.getBoundingClientRect();
      var height = positionInfo.height;
      var width = positionInfo.width;
      levelSize = positionInfo.width;
      levelSize = 100;
    }

    var levelSize = this.config.size ? parseFloat(this.config.size) : 400;
    const bubbleSize = this.config.bubbleSize
      ? parseFloat(this.config.bubbleSize)
      : levelSize / 10;
    const factor = levelSize / 20;
    const vehicleWidthCm = this.config.vehicleWidth
      ? parseFloat(this.config.vehicleWidth)
      : 240;
    const vehicleLengthCm = this.config.vehicleLength
      ? parseFloat(this.config.vehicleLength)
      : 400;
    const fontSize = levelSize / 2;

    const entityX = this.config.entity_x;
    const xAngle = hass.states[entityX];
    const xAngleStr = xAngle ? xAngle.state : "unavailable";
    //const xAngleStr = "0.0";

    const entityY = this.config.entity_y;
    const yAngle = hass.states[entityY];
    const yAngleStr = yAngle ? yAngle.state : "unavailable";
    //const yAngleStr = "0.0";

    var frontLeftCm = 0.0;
    var frontRightCm = 0.0;
    var backLeftCm = 0.0;
    var backRightCm = 0.0;
    if (xAngle && yAngle) {
      const xAngleFloat = parseFloat(xAngleStr);
      const yAngleFloat = parseFloat(yAngleStr);

      if (xAngleFloat >= 0 && yAngleFloat >= 0) {
        // frontLeftCm = 0.0;
        frontRightCm = Math.round(
          Math.sin(xAngleFloat * (Math.PI / 180)) * vehicleWidthCm
        );
        backLeftCm = Math.round(
          Math.sin(yAngleFloat * (Math.PI / 180)) * vehicleLengthCm
        );
        backRightCm = frontRightCm + backLeftCm;
      }
      if (xAngleFloat >= 0 && yAngleFloat < 0) {
        // backLeftCm = 0.0;
        frontLeftCm = Math.round(
          -Math.sin(yAngleFloat * (Math.PI / 180)) * vehicleLengthCm
        );
        backRightCm = Math.round(
          Math.sin(xAngleFloat * (Math.PI / 180)) * vehicleWidthCm
        );
        frontRightCm = frontLeftCm + backRightCm;
      }
      if (xAngleFloat < 0 && yAngleFloat >= 0) {
        // frontRigtCm = 0.0;
        frontLeftCm = Math.round(
          Math.sin(yAngleFloat * (Math.PI / 180)) * vehicleWidthCm
        );
        backRightCm = Math.round(
          -Math.sin(xAngleFloat * (Math.PI / 180)) * vehicleLengthCm
        );
        backLeftCm = frontLeftCm + backRightCm;
      }
      if (xAngleFloat < 0 && yAngleFloat < 0) {
        // backRightCm = 0.0;
        frontRightCm = Math.round(
          -Math.sin(yAngleFloat * (Math.PI / 180)) * vehicleLengthCm
        );
        backLeftCm = Math.round(
          -Math.sin(xAngleFloat * (Math.PI / 180)) * vehicleWidthCm
        );
        frontLeftCm = frontRightCm + backLeftCm;
      }
    }

    //const xOffset = (parseFloat(xAngleStr) * -20-(levelSize/2+bubbleSize/2)).toString();
    //const yOffset = (parseFloat(yAngleStr) * -20-(levelSize/2+bubbleSize/2)).toString();
    const xOffset = Math.round(
      parseFloat(xAngleStr) * factor - bubbleSize / 2
    ).toString();
    const yOffset = Math.round(
      -parseFloat(yAngleStr) * factor - bubbleSize / 2
    ).toString();

    this.content.innerHTML = `
      <row style="display: flex;">
        <div style="flex: 100%;text-align: center;justify-content: center;align-items: center;">
        <div id="vtcbubble" style="position: relative;font-weight: 900;font-size: ${fontSize}%;
          max-width: 100%; heigth: ${levelSize}px;">
          <div style="position: absolute;top: 0px;left: 0px;">${frontLeftCm}cm</div>
          <div style="position: absolute;bottom: 0px;left: 0px;">${backLeftCm}cm</div>
          <div style="position: absolute;top: 0px;right: 0px;">${frontRightCm}cm</div>
          <div style="position: absolute;bottom: 0px;right: 0px;">${backRightCm}cm</div>
            <img src="/local/van-tilt-card/img/level_green.png"
              style="max-width: 100%;height: ${levelSize}px;);"><img src="/local/van-tilt-card/img/bubble_blue.png" align="bottom"
              style="width: ${bubbleSize}px ;height: ${bubbleSize}px;
              position: absolute;top: 50%;left: 50%;
              noposition: absolute;bottom: ${xOffset}px;right: ${yOffset}px;
              transform:translate(${xOffset}px, ${yOffset}px);">
          </div>
          <!--
          <hr>
          <h1>${yAngleStr}°&nbsp;&nbsp;&nbsp;${xAngleStr}°</h1>
          <hr>
          <h1>${xOffset}px&nbsp;&nbsp;&nbsp;${yOffset}px</h1>
          <hr>
          <h1>${frontLeftCm}cm&nbsp;&nbsp;&nbsp;${frontRightCm}cm</h1>
          <br/>
          <h1>${backLeftCm}cm&nbsp;&nbsp;&nbsp;${backRightCm}cm</h1>
          -->
        </div>
      </row>
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    if (!config.entity_x) {
      throw new Error("You need to define an entity_x");
    }
    if (!config.entity_y) {
      throw new Error("You need to define an entity_y");
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 5;
  }
}

customElements.define("van-tilt-card-bubble", VanTiltCardBubble);
