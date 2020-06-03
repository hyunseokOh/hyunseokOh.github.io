<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

$mail = new PHPMailer;
$mail->setLanguage('ko','');
$mail->isSMTP(); 
$mail->CharSet = 'utf-8';
$mail->SMTPDebug = SMTP::DEBUG_SERVER; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->Host = "smtp.gmail.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
$mail->Port = 587; // TLS only
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ssl is deprecated
$mail->SMTPAuth = true;
$mail->Username = 'hyunseok0222'; // email
$mail->Password = 'ohszang1'; // password
$mail->setFrom( $_POST["email"],  $_POST["fname"]." ".$_POST["lname"]); // From email and name
$mail->addAddress('hyunseok0222', 'Hyunseok Oh'); // to email and name
$mail->Subject =  $_POST["subject"];
$mail->msgHTML($_POST["message"]); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
$mail->AltBody = 'HTML messaging not supported'; // If html emails is not supported by the receiver, show this body
// $mail->addAttachment('images/phpmailer_mini.png'); //Attach an image file

if(!$mail->send()){
    //echo "<script>alert('메일 발송에 실패 했습니다.');  history.back();</script> Mailer Error: " . $mail->ErrorInfo;
    echo "<script>alert('메일 발송에 실패 했습니다.');  history.back();</script>";
}else{
    echo "<script>alert('메일이 발송 되었습니다.');  history.back();</script>";
}
?>