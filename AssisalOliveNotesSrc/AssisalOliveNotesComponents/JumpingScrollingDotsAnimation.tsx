import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const JumpingScrollingDotsAnimation = () => {
  const dimensions = Dimensions.get('window');

  const swcandHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Enlarged, more pronounced loader --9 */
        .loader {
          --color: white;
          --size-mid: 12vmin;
          --size-dot: 5vmin; /* deutlich größer */
          display: block;
          position: relative;
          width: 100%;
          display: grid;
          place-items: center;
        }

        .loader::before,
        .loader::after {
          content: '';
          box-sizing: border-box;
          position: absolute;
          will-change: transform, opacity;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.25));
        }

        /* loader --9 (stronger motion + scale + glow) */
        .loader.--9::before,
        .loader.--9::after {
          width: var(--size-dot);
          height: var(--size-dot);
          border-radius: 50%;
          background-color: var(--color);
          box-shadow: 0 0 18px rgba(255,255,255,0.12), inset 0 0 8px rgba(255,255,255,0.06);
          animation: loader-9 0.72s cubic-bezier(0.22, 0.9, 0.28, 1) infinite;
        }

        .loader.--9::before {
          left: calc(50% - var(--size-dot) - 4vmin); /* größerer Abstand */
        }

        .loader.--9::after {
          left: calc(50% + 4vmin);
          animation-delay: 0.16s;
        }

        @keyframes loader-9 {
          0% {
            opacity: 0;
            transform: translate(-10vmin, -10vmin) scale(0.5) rotate(-10deg);
            filter: blur(2px);
          }
          25% {
            opacity: 1;
            transform: translate(-6vmin, -6vmin) scale(1.25) rotate(6deg);
            filter: blur(0);
          }
          55% {
            opacity: 1;
            transform: translate(-1vmin, -1vmin) scale(1.05) rotate(0deg);
          }
          80% {
            opacity: 0.9;
            transform: translate(0,0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(0,0) scale(0.8) rotate(8deg);
            filter: blur(1px);
          }
        }

        /* transparent background so host view controls background */
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
          font-family: 'Noto Sans', sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .container {
          display: grid;
          place-items: center;
          width: 35vmin; /* еще больше пространства */
          height: 35vmin;
        }

        .item {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div class="page">
        <main class="container">
          <div class="item">
            <i class="loader --9"></i>
          </div>
        </main>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={{height: dimensions.height * 0.14,alignSelf: 'center',width: dimensions.width * 0.350534,flex: 1,}}>
      <WebView
        startInLoadingState={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="compatibility"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scalesPageToFit={false}
        mediaPlaybackRequiresUserAction={false}
        source={{ html: swcandHtml }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        allowsInlineMediaPlayback={true}
        bounces={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default JumpingScrollingDotsAnimation;