import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hungtuongcode@gmail.com',
                pass: 'didprvawsylysjkb',
            },
        });
    }

    async sendEmail(
        recipient: string,
        subject: string,
        content: string,
    ): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: '"Admin RA 👻" <no-relply@hung.com>',
                to: recipient,
                subject,
                html: content,
            });
        } catch (error) {
            throw new Error('Failed to send email');
        }
    }
}