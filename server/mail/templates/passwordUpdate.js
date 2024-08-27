exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Update Confirmation</title>
    <style>
        body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            color: #555555;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .support {
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }

        .highlight {
            font-weight: bold;
            color: #0056b3;
        }

        .btn {
            display: inline-block;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            background-color: #0056b3;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #004494;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
            <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
        </a>
        <div class="message">Password Update Confirmation</div>
        <div class="body">
            <p>Hey ${name},</p>
            <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.</p>
            <p>If you did not request this password change, please contact us immediately to secure your account.</p>
        </div>
        <a href="mailto:info@studynotion.com" class="btn">Contact Support</a>
        <div class="support">
            If you have any questions or need further assistance, please feel free to reach out to us at
            <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
        </div>
    </div>
</body>
</html>
`;
};
