const fs = require('fs');

async function test() {
  const ws = new WebSocket('ws://localhost:9222/devtools/page/2ED7D005873F05B27713BD207D268C67');
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const curId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  ws.addEventListener('open', async () => {
    try {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });
      
      let res = null;
      for (let i = 0; i < 20; i++) {
        const info = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const iframes = Array.from(document.querySelectorAll('iframe'));
              const doc = iframes.length > 0 ? (iframes[0].contentDocument || iframes[0].contentWindow.document) : document;
              const ov = doc.querySelector('#overview');
              if (!ov) return null;
              const btns = Array.from(ov.querySelectorAll('button'));
              if (btns.length === 0) return null;
              btns[0].scrollIntoView({ behavior: 'instant', block: 'center' });
              const parent = ov.querySelector('.overview-cta-row') || (btns[0] ? btns[0].parentElement : null);
              return {
                parentFlexDir: parent ? getComputedStyle(parent).flexDirection : null,
                parentFlexWrap: parent ? getComputedStyle(parent).flexWrap : null,
                btn1Width: btns[0] ? getComputedStyle(btns[0]).width : null,
                btn2Width: btns[1] ? getComputedStyle(btns[1]).width : null,
                btn1Top: btns[0] ? btns[0].getBoundingClientRect().top : null,
                btn2Top: btns[1] ? btns[1].getBoundingClientRect().top : null,
                areSameRow: btns[0] && btns[1] ? Math.abs(btns[0].getBoundingClientRect().top - btns[1].getBoundingClientRect().top) < 5 : false
              };
            })()
          `,
          returnByValue: true
        });
        if (info.result && info.result.value) {
          res = info.result.value;
          break;
        }
        await new Promise(r => setTimeout(r, 600));
      }
      console.log('Result:', JSON.stringify(res, null, 2));

      await new Promise(r => setTimeout(r, 600));
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:/Users/Atosh-sode/.gemini/antigravity-ide/brain/1da4fe20-faca-48f2-befe-68a744b40468/scratch/overview_buttons_final.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved final overview screenshot');
    } catch (e) {
      console.error(e);
    } finally {
      ws.close();
    }
  });
}
test().catch(console.error);
