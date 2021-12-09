const PUBLIC_VAPID_KEY = "BKXtP5Fs4olVnZ-c8c90XWIdt4LWDYu8p9OlWecIZuyXU8_xCoI2D9HwkX1mYfPnWOt4yYZ7DSfUd0p2Mc_9JFM";

if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./SW.js').then(
        async function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        //Registering to pushnot
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
        });

        await fetch('http://localhost:3000/subscription', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("suscrito");
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
}
