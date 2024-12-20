<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$sender = 'no-reply@ambercomm.ae';
$senderName = 'AMBER';
$recipient = 'info@ambercomm.ae';

$host = 'sg2plzcpnl508281.prod.sin2.secureserver.net';
$port = 587;
$username = 'no-reply@ambercomm.ae';
$password = 'orQP3*RBcp;D';

$subject = 'Test Email using PHPMailer';
$bodyText = "This is a plain-text version of the email.";
$bodyHtml = "<h1>Test Email</h1><p>This is an email sent using PHPMailer with GoDaddy's SMTP server.</p>";

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$subject = $_POST['subject'] ?? '';
$file = $_FILES['file'] ?? null;

if( if( $subject === 'Internship Request' ) ) {

    $bodyHtml = "<p>Dear Team, <br /><br />You've received a new Internship Request from the website. <br />Below are the details: <br /><br />
        <b>Name:</b>  ". $name ."<br />
        <b>Phone:</b>  ". $phone ."<br />
        <b>Email:</b>  ". $email ."<br /><br />
        Please get in touch with the lead at your earliest convenience to provide further assistance and information.<br /><br />Thank You.
    </p>";
    $bodyText = "Dear Team, You've received a new Internship Request from the website. Below are the details:
        Name:  ". $name ."
        Phone:  ". $phone ."
        Email:  ". $email ."
        Please get in touch with the lead at your earliest convenience to provide further assistance and information. Thank You.
    </p>";

}

if( if( $subject === 'Work Profile' ) ) {

    $bodyHtml = "<p>Dear Team, <br /><br />You've received a new Work Profile from the website. <br />Below are the details: <br /><br />
        <b>Name:</b>  ". $name ."<br />
        <b>Phone:</b>  ". $phone ."<br />
        <b>Email:</b>  ". $email ."<br /><br />
        Please get in touch with the lead at your earliest convenience to provide further assistance and information.<br /><br />Thank You.
    </p>";
    $bodyText = "Dear Team, You've received a new Work Profile from the website. Below are the details:
        Name:  ". $name ."
        Phone:  ". $phone ."
        Email:  ". $email ."
        Please get in touch with the lead at your earliest convenience to provide further assistance and information. Thank You.
    </p>";

}

if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = $host;
            $mail->SMTPAuth = true;
            $mail->Username = $username;
            $mail->Password = $password;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $port;

            $mail->setFrom($sender, $senderName);
            $mail->addAddress($recipient);
            //$mail->addBCC('');

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $bodyHtml;
            $mail->AltBody = $bodyText;

            $mail->addAttachment($file['tmp_name'], $file['name']);

            $mail->send();

            $response['status'] = 'success';
            $response['message'] = 'Message has been sent';
            echo json_encode($response);

            //$mail->SMTPDebug = 2; 
            //$mail->Debugoutput = 'html';

        } catch (Exception $e) {

            $response['status'] = 'error';
            $response['message'] = 'Email not sent. Error: '. $mail->ErrorInfo;
            echo json_encode($response);

        }
        
    } else {
        echo json_encode(["success" => false, "message" => "File upload failed."]);
    }
}

?>