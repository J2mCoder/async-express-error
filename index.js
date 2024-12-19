/**
 * Enveloppe une fonction asynchrone pour gérer les erreurs de manière centralisée.
 * @param {Function} fn - La fonction asynchrone à envelopper.
 * @returns {Function} - La fonction enveloppée.
 */
const asyncHandler =
  (fn) =>
  (...args) => {
    const next = args[args.length - 1]
    return Promise.resolve(fn(...args)).catch(next)
  }

module.exports = asyncHandler
