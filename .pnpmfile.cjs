function readPackage(pkg) {
  // Approve builds for Tailwind CSS and Sharp
  if (pkg.name === '@tailwindcss/oxide' || pkg.name === 'sharp') {
    pkg.scripts = pkg.scripts || {};
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
}