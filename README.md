# van-tilt-sensor-custom-card
Custom home assistant lovelace card showing how tilted the van is

## Installation

### HACS (recommended)

1. In Home Assistant, open HACS and go to the "Frontend" section.
2. Click the three-dot menu in the top right and choose "Custom repositories".
3. Add `https://github.com/CF209/van-tilt-sensor-custom-card` as a repository with the category "Lovelace".
4. Find "Van Tilt Card" in the HACS list, click it, and choose "Download".
5. Reload your browser. HACS adds the card resource automatically.

HACS downloads the latest GitHub Release, which bundles the JS and image assets together so the card works offline.

### Manual

Create a new folder in your `homeassistant/www/` directory called `van-tilt-card` and download the files to this directory. Then in Home Assistant go to Configuration → Lovelace Dashboards → Resources and click "Add Resource". Enter `/local/van-tilt-card/van-tilt-card.js` for the URL and "JavaScript Module" for the type and click create.

## Usage

Add the card to your dashboard with the following config:

```yaml
type: 'custom:van-tilt-card'
entity_x: sensor.filtered_x_angle
entity_y: sensor.filtered_y_angle
```

![alt text](https://github.com/CF209/vanomation_website/blob/main/assets/img/tilt/tilt5.png)
