<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['firstName']) || !isset($input['lastName']) || !isset($input['phone']) || 
    !isset($input['email']) || !isset($input['gender']) || !isset($input['comment'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$contact = [
    'firstName' => $input['firstName'],
    'lastName' => $input['lastName'],
    'phone' => $input['phone'],
    'email' => $input['email'],
    'gender' => $input['gender'],
    'comment' => $input['comment'],
    'submissionDate' => date('c')
];

$filePath = __DIR__ . '/../data/contact_submissions.json';

// Read existing submissions
$submissions = [];
if (file_exists($filePath)) {
    $existingContent = file_get_contents($filePath);
    if ($existingContent !== false) {
        $submissions = json_decode($existingContent, true);
        if ($submissions === null) {
            $submissions = [];
        }
    }
}

// Add new submission
$submissions[] = $contact;

// Save to file
$jsonContent = json_encode($submissions, JSON_PRETTY_PRINT);
if (file_put_contents($filePath, $jsonContent) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save contact form']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Contact form submitted successfully'
]);
?>

