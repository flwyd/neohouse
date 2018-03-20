import ENV from 'neohouse/config/environment';

export function config(variable) {
  const neoConfig = ENV['neoConfig'];

  if (!neoConfig) {
    return null;
  }

  return neoConfig[variable];
}
