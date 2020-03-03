import { useEffect, createRef } from 'react';

// https://github.com/serratus/quaggaJS/blob/master/example/camera_example.html
// import Quagga from 'quagga';

type GetUserMedia = (
  constraints: MediaStreamConstraints,
  successCallback: NavigatorUserMediaSuccessCallback,
  errorCallback: NavigatorUserMediaErrorCallback
) => void;

const getUserMedia: GetUserMedia = (constraints, success, failure) => {
  if (!navigator.mediaDevices) {
    failure('navigator.mediaDevices is undefined' as any);
    return;
  }
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    const videoSrc =
      (window.URL && window.URL.createObjectURL(stream)) || stream;
    success.apply(null, [videoSrc as MediaStream]);
  }, failure);
};

function initCamera(
  constraints: MediaStreamConstraints,
  video: HTMLVideoElement,
  callback: (msg?: string) => void
) {
  getUserMedia(
    constraints,
    function(src) {
      video.src = src as any;
      video.addEventListener(
        'loadeddata',
        function() {
          var attempts = 10;

          function checkVideo() {
            if (attempts > 0) {
              if (video.videoWidth > 0 && video.videoHeight > 0) {
                console.log(
                  video.videoWidth + 'px x ' + video.videoHeight + 'px'
                );
                video.play();
                callback();
              } else {
                window.setTimeout(checkVideo, 100);
              }
            } else {
              callback('Unable to play video stream.');
            }
            attempts--;
          }

          checkVideo();
        },
        false
      );
    },
    function(e) {
      console.log(e);
    }
  );
}

function copyToCanvas(video: HTMLVideoElement, ctx: CanvasRenderingContext2D) {
  (function frame() {
    ctx.drawImage(video, 0, 0);
    window.requestAnimationFrame(frame);
  })();
}

type CanvasRef = React.RefObject<HTMLCanvasElement>;
type VideoRef = React.RefObject<HTMLVideoElement>;

function init(canvasRef: CanvasRef, videoRef: VideoRef) {
  if (IS_SERVER) return;

  const canvas = canvasRef.current!;
  const video = videoRef.current!;
  const constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720,
      },
    },
  };
  initCamera(constraints as any, video, () => {
    canvas.width = video.width;
    canvas.height = video.height;

    copyToCanvas(video, canvas.getContext('2d')!);
  });
}

function useBarcodeReader() {
  return {
    canvasRef: createRef() as CanvasRef,
    videoRef: createRef() as VideoRef,
  };
}

export const BarcodeReaderCamera = (): JSX.Element => {
  const { canvasRef, videoRef } = useBarcodeReader();
  useEffect(() => init(canvasRef, videoRef), []);
  return (
    <div>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
