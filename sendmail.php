<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

print_r('namespace')


require $_SERVER["DOCUMENT_ROOT"].'/PHPMailer/src/Exception.php';
require $_SERVER["DOCUMENT_ROOT"].'/PHPMailer/src/PHPMailer.php';
require $_SERVER["DOCUMENT_ROOT"].'/PHPMailer/src/SMTP.php';

print_r('require')

$mail = new PHPMailer;
// $mail->setLanguage('ko','');
$mail->isSMTP(); 
$mail->CharSet = 'utf-8';
$mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->Host = "smtp.gmail.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
$mail->Port = 587; // TLS only
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ssl is deprecated
$mail->SMTPAuth = true;
$mail->Username = 'hyunseok0222@gmail.com'; // email
$mail->Password = 'ohszang1'; // password
$mail->setFrom( $_POST["email"],  $_POST["fname"]." ".$_POST["lname"]); // From email and name
$mail->addAddress('hyunseok0222@gmail.com', 'Hyunseok Oh'); // to email and name
$mail->Subject =  $_POST["subject"];
$mail->msgHTML($_POST["message"]); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
$mail->AltBody = 'HTML messaging not supported'; // If html emails is not supported by the receiver, show this body
// $mail->addAttachment('images/phpmailer_mini.png'); //Attach an image file

if (!$mail->send()) {
    echo 'Mailer Error: '. $mail->ErrorInfo;
} else {
    echo 'Message sent!';
    //Section 2: IMAP
    //Uncomment these to save your message in the 'Sent Mail' folder.
    #if (save_mail($mail)) {
    #    echo "Message saved!";
    #}
}
?>