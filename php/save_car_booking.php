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

if (!isset($input['bookingNumber']) || !isset($input['userId']) || !isset($input['carId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$booking = [
    'bookingNumber' => $input['bookingNumber'],
    'userId' => $input['userId'],
    'userPhone' => $input['userPhone'] ?? '',
    'carId' => $input['carId'],
    'city' => $input['city'] ?? '',
    'carType' => $input['carType'] ?? '',
    'pickupDate' => $input['pickupDate'] ?? '',
    'dropoffDate' => $input['dropoffDate'] ?? '',
    'pricePerDay' => $input['pricePerDay'] ?? 0,
    'totalPrice' => $input['totalPrice'] ?? 0,
    'bookingDate' => $input['bookingDate'] ?? date('c')
];

$filePath = __DIR__ . '/../data/car_bookings.xml';

// Load existing XML or create new
$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

if (file_exists($filePath) && filesize($filePath) > 0) {
    $dom->load($filePath);
    $root = $dom->documentElement;
} else {
    // Create new XML structure
    $root = $dom->createElement('bookings');
    $dom->appendChild($root);
    $dom->appendChild($dom->createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"'));
}

// Create booking element
$bookingElement = $dom->createElement('booking');

$fields = ['bookingNumber', 'userId', 'userPhone', 'carId', 'city', 'carType', 'pickupDate', 'dropoffDate', 'pricePerDay', 'totalPrice', 'bookingDate'];
foreach ($fields as $field) {
    $element = $dom->createElement($field);
    $element->textContent = (string)($booking[$field] ?? '');
    $bookingElement->appendChild($element);
}

$root->appendChild($bookingElement);

// Save to file
if ($dom->save($filePath) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save booking']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Car booking saved successfully',
    'bookingNumber' => $booking['bookingNumber']
]);
?>

