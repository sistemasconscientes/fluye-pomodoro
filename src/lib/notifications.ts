// Browser Notification API wrapper for Fluye timer alerts

export type NotificationPermissionStatus = "granted" | "denied" | "default" | "unsupported";

export function getNotificationStatus(): NotificationPermissionStatus {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission as NotificationPermissionStatus;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";

  const result = await Notification.requestPermission();
  return result as NotificationPermissionStatus;
}

interface TimerNotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export function sendTimerNotification({ title, body, icon = "/pwa-192.png" }: TimerNotificationOptions): void {
  if (getNotificationStatus() !== "granted") return;

  // Only send if tab is not visible (user is away)
  if (document.visibilityState === "visible") return;

  try {
    const options: NotificationOptions & { renotify?: boolean } = {
      body,
      icon,
      badge: icon,
      tag: "fluye-timer",
      renotify: true,
    };
    const notification = new Notification(title, options as NotificationOptions);
    });

    // Auto-close after 8 seconds
    setTimeout(() => notification.close(), 8000);

    // Focus tab on click
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (e) {
    console.warn("Notification failed:", e);
  }
}
