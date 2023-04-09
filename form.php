<?php
use PHPMailer\PHPMailer\PHPMailer;

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$message = $_POST['message'];

require_once "mailer/PHPMailer.php";
require_once "mailer/SMTP.php";
require_once "mailer/Exception.php";

$mail = new PHPMailer();
$mail->CharSet = 'utf-8';

try{
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = ' ';
    $mail->Password = ' ';
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;

    $mail->setFrom(' ', 'Sender');
    $mail->addAddress(' ', 'Recipient');

    $mail->isHTML(true);
    $mail->Subject = 'Theme of message';
    $mail->Body = 'Name: ' . $firstName . '<br>Last Name: ' . $lastName . '<br>Phone: ' . $tel . '<br>Message: ' . $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    header('Location: index.html');
} catch (Exception $e) {
    echo "Mailer Error: {$mail->ErrorInfo}";
}
?>