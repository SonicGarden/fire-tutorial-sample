export const isTest = () => process.env.NODE_ENV === 'test' || process.env.FUNCTIONS_EMULATOR === 'true';
