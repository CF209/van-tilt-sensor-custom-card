# van-tilt-sensor-custom-card
Custom home assistant lovelace card showing how tilted the van is

To install the card, create a new folder in your "homeassistant/www/" directory called "van-tilt-card" and download the files to this directory. Then in Home Assistant go to Configuration - Lovelace Dashboards - Resources and click "Add Resource". Enter "/local/van-tilt-card/van-tilt-card.js" for the URL and "JavaScript Module" for the type and click create. Back in your main dashboard, you can now manually add the new card with the following code:

type: 'custom:van-tilt-card'<br>
entity_x: sensor.filtered_x_angle<br>
entity_y: sensor.filtered_y_angle<br>

![alt text](https://github.com/CF209/vanomation_website/blob/main/assets/img/tilt/tilt5.png)
