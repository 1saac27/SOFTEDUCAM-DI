#include <avr/io.h> // Incluir la librería para el microcontrolador AVR

#define F_CPU 16000000UL // Definir la frecuencia del microcontrolador a 16MHz
#define BAUD 9600 // Definir la velocidad de transmisión en baudios

// Calcular el valor para el registro UBRR (Usart Baud Rate Register)
#define UBRR_VALUE ((F_CPU / (16UL * BAUD)) - 1)

// Función para inicializar el puerto serial
void USART_Init() {
    // Establecer el baud rate
    UBRR0H = (unsigned char)(UBRR_VALUE >> 8);
    UBRR0L = (unsigned char)UBRR_VALUE;
    // Habilitar la transmisión y recepción
    UCSR0B = (1 << TXEN0) | (1 << RXEN0);
    // Establecer el tamaño de trama de 8 bits
    UCSR0C = (1 << UCSZ01) | (1 << UCSZ00);
}

// Función para transmitir un carácter
void USART_Transmit(unsigned char data) {
    // Esperar a que el buffer de transmisión esté vacío
    while (!(UCSR0A & (1 << UDRE0)));
    // Colocar el carácter en el buffer de transmisión
    UDR0 = data;
}

// Función para recibir un carácter
unsigned char USART_Receive() {
    // Esperar a que se reciba un carácter
    while (!(UCSR0A & (1 << RXC0)));
    // Devolver el carácter recibido
    return UDR0;
}

int main() {
    // Inicializar el puerto serial
    USART_Init();
    
    // Ejemplo de transmisión y recepción de datos
    USART_Transmit('H');
    USART_Transmit('e');
    USART_Transmit('l');
    USART_Transmit('l');
    USART_Transmit('o');
    
    // Recibir un carácter y enviar de vuelta
    unsigned char received_char = USART_Receive();
    USART_Transmit(received_char);
    
    return 0;
}
