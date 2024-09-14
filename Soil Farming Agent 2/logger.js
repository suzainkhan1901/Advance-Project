export function logAction(action, data) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${action}:`, data);
}
