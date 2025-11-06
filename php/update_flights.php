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

if (!isset($input['flightId']) || !isset($input['seatsToDeduct'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters: flightId and seatsToDeduct']);
    exit;
}

$flightId = $input['flightId'];
$seatsToDeduct = (int)$input['seatsToDeduct'];

$filePath = __DIR__ . '/../data/flights.json';

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'flights.json file not found']);
    exit;
}

// Read and parse JSON file
$jsonContent = file_get_contents($filePath);
$data = json_decode($jsonContent, true);

if ($data === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to parse flights.json']);
    exit;
}

// Find and update the flight
$flightFound = false;
if (isset($data['flights']) && is_array($data['flights'])) {
    foreach ($data['flights'] as &$flight) {
        if (isset($flight['flightId']) && $flight['flightId'] === $flightId) {
            $flight['availableSeats'] = max(0, (int)$flight['availableSeats'] - $seatsToDeduct);
            $flightFound = true;
            break;
        }
    }
} else {
    // Handle case where flights.json is directly an array
    foreach ($data as &$flight) {
        if (isset($flight['flightId']) && $flight['flightId'] === $flightId) {
            $flight['availableSeats'] = max(0, (int)$flight['availableSeats'] - $seatsToDeduct);
            $flightFound = true;
            break;
        }
    }
}

if (!$flightFound) {
    http_response_code(404);
    echo json_encode(['error' => 'Flight not found']);
    exit;
}

// Save updated JSON back to file
$updatedJson = json_encode($data, JSON_PRETTY_PRINT);
if (file_put_contents($filePath, $updatedJson) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write to flights.json']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => "Updated flight {$flightId}: deducted {$seatsToDeduct} seats",
    'flightId' => $flightId,
    'seatsDeducted' => $seatsToDeduct
]);
?>

