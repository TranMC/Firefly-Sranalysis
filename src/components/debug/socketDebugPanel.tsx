"use client";

import { getSocketDebugInfo } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function SocketDebugPanel() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isOpen) {
        const info = getSocketDebugInfo();
        setDebugInfo(info);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 btn btn-xs btn-ghost text-xs opacity-50 hover:opacity-100"
        title="Socket Debug Info"
      >
        🔧 Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-base-900/95 border border-base-600 rounded-lg p-3 text-xs font-mono shadow-lg max-w-xs max-h-60 overflow-auto">
      <button
        onClick={() => setIsOpen(false)}
        className="btn btn-xs btn-ghost btn-circle absolute top-1 right-1"
      >
        ✕
      </button>
      
      <div className="mb-2 font-bold text-yellow-400">🔧 Socket Debug Info</div>
      
      {debugInfo && (
        <div className="space-y-1 text-gray-300">
          <div>
            Connected:{" "}
            <span className={debugInfo.isConnected ? "text-green-400" : "text-red-400"}>
              {debugInfo.isConnected ? "✅" : "❌"}
            </span>
          </div>
          <div>Socket ID: <span className="text-blue-400">{debugInfo.socketId || "N/A"}</span></div>
          <div>Reconnect Attempts: <span className="text-yellow-400">{debugInfo.reconnectCount}</span></div>
          <div>Event Queue: <span className="text-cyan-400">{debugInfo.eventQueueLength}</span></div>
          <div>Pending Parse: <span className="text-cyan-400">{debugInfo.pendingParseRequests}</span></div>
          <div>Worker Pool: <span className="text-cyan-400">{debugInfo.workerPoolSize}</span></div>
          <div className="text-gray-500 mt-2">Last Disconnect:</div>
          <div className="text-gray-400">{debugInfo.lastDisconnect}</div>
        </div>
      )}
    </div>
  );
}
