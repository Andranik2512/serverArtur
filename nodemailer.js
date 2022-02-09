import nodemailer from 'nodemailer'

export default async (email, pramOrder) => {
    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })

    let result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: 'Message from Node JS',
        text: paramOrder,
        html:  'This <i>message</i> was sent from <strong>Node js</strong> server.'
    })
    console.log(result);
}