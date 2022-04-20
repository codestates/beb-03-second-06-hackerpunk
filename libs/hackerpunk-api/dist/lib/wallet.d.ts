/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address and privateKey
 */
declare const createWallet: (pwd: string) => any;
export { createWallet };
