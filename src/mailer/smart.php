<?php 

$phone = $_POST['user__tel'];
$email = $_POST['user__email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
// $mail->Username = 'smolkayury@yandex.ru';                 // Наш логин
// $mail->Password = 'tank1990';      
$mail->Username = 'yurysmolka@gmail.com';                 // Наш логин
$mail->Password = 'tank;!1990';                 // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('yurysmolka@gmail.com', 'WebSiteCoder');   // От кого письмо 
$mail->addAddress('order@salesgenerator.pro');     // Add a recipient
// $mail->addAddress('yurysmolka@gmail.com');  
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка Смолко Юрий';
$mail->Body    = '
	 <br> 
	E-mail: ' . $email . '<br>
	Телефон: '. $phone ;

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>