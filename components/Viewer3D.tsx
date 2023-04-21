declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export const Viewer3D = () => (
  <>
    <script
      type="module"
      src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"
    ></script>
    <model-viewer
      alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
      src="vault-boy/scene.gltf"
      ar
      shadow-intensity="1"
      camera-controls
      touch-action="pan-y"
    ></model-viewer>
  </>
);
