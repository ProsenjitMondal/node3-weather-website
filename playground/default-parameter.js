const greeter = (name='anonymous') => {
    console.log(`Hello ${name}`);
};

greeter('Prosenjit');
greeter();


const products = {
    label: 'MacBook Pro',
    stock: '10'
};
const transaction = (type, {label='laptop', stock=0} = {}) => {
    console.log(type, label, stock);
};

transaction('order', products);