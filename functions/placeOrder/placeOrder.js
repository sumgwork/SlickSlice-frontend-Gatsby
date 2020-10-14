const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
        <h2>Your recent order for ${total}</h2>
        <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
        <ul>
            ${order.map(
              (item) => `<li>
                    <img src="${item.thumbnail}" alt="${item.name}" />
                    ${item.size} ${item.name} - ${item.price}
                </li>`
            )}
        </ul>
        <p>Your total is <strong>${total}</strong> due at pickup</p>
        <style>
                ul {
                    list-style: none;
                }
        </style>
    </div>`;
}

// Create a transport for nodemailer (using Ethereal.email)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_POST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, _context) => {
  const body = JSON.parse(event.body);
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzssstt good bye' }),
    };
  }
  // Validate data
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking if ${field} is present`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }

  // make sure there are items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing!`,
      }),
    };
  }

  // Send email

  // Send success or error response

  // Test email
  await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success',
    }),
  };
};
