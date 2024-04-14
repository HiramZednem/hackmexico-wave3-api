// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Wave3 {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.AddressSet;

    // Enum que define los posibles estados de la Wave
    enum WaveState { Abierto, Cerrado, Pendiente, EnProgreso, Completado }

    // Estructura para almacenar el estado de la Wave
    struct Estado {
        string nombre;
        string descripcion;
        WaveState estadoWave;
        address usuarioA;
        address usuarioB;
        bool pagoRealizado;
    }

    address public propietario; // Dirección del propietario del contrato
    Estado public estado; // Estado de la Wave
    uint256 public montoPrestamo;
    uint256 public tasaInteres; // Tasa de interés en porcentaje (por ejemplo, 5 para 5%)
    uint256 public tiempoLimite;
    uint256 public tiempoInicio;
    uint256 public tiempoFin;
    uint256 public saldoUsuarioA;
    uint256 public saldoUsuarioB;

    event PrestamoAceptado(address usuarioA, address usuarioB, uint256 montoPrestamo);

    // Constructor del contrato
    constructor(
        string memory _nombre,
        string memory _descripcion,
        uint256 _montoPrestamo,
        uint256 _tasaInteres,
        uint256 _tiempoLimite
    ) {
        propietario = msg.sender;
        estado.nombre = _nombre;
        estado.descripcion = _descripcion;
        montoPrestamo = _montoPrestamo;
        tasaInteres = _tasaInteres;
        tiempoLimite = _tiempoLimite;
        estado.estadoWave = WaveState.Abierto;
    }

    // Modificador que permite que solo el propietario del contrato ejecute una función
    modifier soloPropietario() {
        require(msg.sender == propietario, "Solo el propietario puede llamar a esta funcion");
        _;
    }

    // Modificador que permite que solo los usuarios involucrados en la Wave ejecuten una función
    modifier soloUsuarios() {
        require(msg.sender == estado.usuarioA || msg.sender == estado.usuarioB, "Solo los usuarios pueden llamar a esta funcion");
        _;
    }

    // Función para que el usuario B acepte el préstamo
    function aceptarPrestamo() public soloUsuarios {
        require(msg.sender == estado.usuarioB, "Solo el usuario B puede llamar a esta funcion");
        estado.estadoWave = WaveState.Pendiente;

        emit PrestamoAceptado(estado.usuarioA, estado.usuarioB, montoPrestamo);
    }

    // Función para que el usuario A realice un pago
    function realizarPago(uint256 _monto) public soloUsuarios {
        require(estado.estadoWave == WaveState.Pendiente, "La Wave no esta pendiente");
        require(msg.sender == estado.usuarioA, "Solo el usuario A puede llamar a esta funcion");
        require(_monto <= saldoUsuarioA, "Saldo insuficiente para realizar el pago");

        // Cálculo del monto a pagar con la tasa de interés
        uint256 montoTotal = _monto.mul(100 + tasaInteres).div(100);

        saldoUsuarioA = saldoUsuarioA.sub(_monto);
        saldoUsuarioB = saldoUsuarioB.add(montoTotal);

        // Comprobación si el préstamo se ha pagado completamente
        if (saldoUsuarioA == 0) {
            estado.estadoWave = WaveState.Completado;
            tiempoFin = block.timestamp;
            estado.pagoRealizado = true;
        }
    }

    // Función para obtener el saldo de un usuario
    function obtenerSaldoUsuario(address _usuario) public view returns (uint256) {
        if (_usuario == estado.usuarioA) {
            return saldoUsuarioA;
        } else if (_usuario == estado.usuarioB) {
            return saldoUsuarioB;
        } else {
            revert("Usuario no encontrado");
        }
    }
}
