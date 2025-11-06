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

if (!isset($input['bookingNumber']) || !isset($input['userId']) || !isset($input['flights']) || !isset($input['passengers'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$booking = [
    'bookingNumber' => $input['bookingNumber'],
    'userId' => $input['userId'],
    'userPhone' => $input['userPhone'] ?? '',
    'flights' => $input['flights'],
    'passengers' => $input['passengers'],
    'totalPrice' => $input['totalPrice'] ?? 0,
    'bookingDate' => $input['bookingDate'] ?? date('c')
];

$filePath = __DIR__ . '/../data/flight_bookings.json';

// Read existing bookings
$bookings = [];
if (file_exists($filePath)) {
    $existingContent = file_get_contents($filePath);
    if ($existingContent !== false) {
        $bookings = json_decode($existingContent, true);
        if ($bookings === null) {
            $bookings = [];
        }
    }
}

// Add new booking
$bookings[] = $booking;

// Save to file
$jsonContent = json_encode($bookings, JSON_PRETTY_PRINT);
if (file_put_contents($filePath, $jsonContent) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save booking']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Flight booking saved successfully',
    'bookingNumber' => $booking['bookingNumber']
]);
?>

