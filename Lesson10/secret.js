//* [Can you keep a secret?](https://www.codewars.com/kata/can-you-keep-a-secret)

/**
 * @param {any} secret
 *
 * @return {object}
 */
function createSecretHolder(secret) {
    const result = {
        getSecret() {
            return secret;
        },
        setSecret(newSecret) {
            secret = newSecret;
        }
    };

    return result;
}

//* global: { holder: LE.result, createSecretHolder: f, someObj: { value: 5 }, #1: { value: 10 } }

const someObj = { value: 5 };
const holder = createSecretHolder(someObj);
//* LE = { secret: global.#1, result: { getSecret: f, setSecret: f } }

console.log( holder.getSecret() );
//* LE1 = {  }

holder.setSecret({ value: 10 });
//* LE2 = { arguments: { 0: 10 }, newSecret: 10 }

console.log( holder.getSecret() ); // global.#1
//* LE3 = {  }

console.log( holder );
