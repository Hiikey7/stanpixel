<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo 'There was a problem with your submission, please try again.';
    exit;
}

$name = trim(strip_tags($_POST['name'] ?? ''));
$name = str_replace(["\r", "\n"], ' ', $name);
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$service = trim(strip_tags($_POST['service'] ?? ''));
$message = trim($_POST['message'] ?? '');
$smtpUser = getenv('STANPIXELS_SMTP_USER') ?: 'stano6823@gmail.com';
$smtpPassword = preg_replace('/\s+/', '', (string) getenv('STANPIXELS_SMTP_PASSWORD'));
$recipient = getenv('STANPIXELS_CONTACT_RECIPIENT') ?: $smtpUser;

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please complete the form and try again.';
    exit;
}

if (!$smtpPassword) {
    http_response_code(500);
    echo 'The contact form is not configured yet.';
    exit;
}

$subject = 'New contact form enquiry from ' . $name;
$body = "Name: {$name}\r\nEmail: {$email}\r\n";
if ($service !== '') {
    $body .= "Service: {$service}\r\n";
}
$body .= "\r\nMessage:\r\n{$message}";

function smtpCommand($connection, $command, $expectedCode) {
    if ($command !== '') {
        fwrite($connection, $command . "\r\n");
    }
    $response = '';
    while ($line = fgets($connection, 515)) {
        $response .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    if (substr($response, 0, 3) !== (string) $expectedCode) {
        throw new RuntimeException('SMTP server rejected the request.');
    }
}

try {
    $connection = stream_socket_client('ssl://smtp.gmail.com:465', $errorNumber, $errorMessage, 20);
    if (!$connection) {
        throw new RuntimeException('Could not connect to the SMTP server.');
    }

    smtpCommand($connection, '', 220);
    smtpCommand($connection, 'EHLO stanpixels.co.ke', 250);
    smtpCommand($connection, 'AUTH LOGIN', 334);
    smtpCommand($connection, base64_encode($smtpUser), 334);
    smtpCommand($connection, base64_encode($smtpPassword), 235);
    smtpCommand($connection, 'MAIL FROM:<' . $smtpUser . '>', 250);
    smtpCommand($connection, 'RCPT TO:<' . $recipient . '>', 250);
    smtpCommand($connection, 'DATA', 354);

    $headers = [
        'From: Stanpixels Website <' . $smtpUser . '>',
        'To: ' . $recipient,
        'Reply-To: ' . $email,
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8'
    ];
    smtpCommand($connection, implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.", 250);
    smtpCommand($connection, 'QUIT', 221);
    fclose($connection);

    http_response_code(200);
    echo 'Thank You! Your message has been sent.';
} catch (Throwable $exception) {
    if (isset($connection) && is_resource($connection)) {
        fclose($connection);
    }
    error_log('Contact form SMTP error: ' . $exception->getMessage());
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
}

?>
