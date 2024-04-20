precision mediump float;

uniform vec3 cameraPosition;
uniform sampler2D mapTexture;

varying vec2 vUv;

void main() {
  vec4 mapColor = texture2D(mapTexture, vUv);

  // Calculate the dot intensity based on the map texture.
  float dotIntensity = step(0.5, mapColor.r);

  // Create a blue color for the water.
  vec3 waterColor = vec3(0.0, 0.0, 1.0);

  // Create a white color for the land.
  vec3 landColor = vec3(1.0);

  // Mix the water and land colors based on the dot intensity.
  vec3 color = mix(waterColor, landColor, dotIntensity);

  gl_FragColor = vec4(color, 1.0);
}