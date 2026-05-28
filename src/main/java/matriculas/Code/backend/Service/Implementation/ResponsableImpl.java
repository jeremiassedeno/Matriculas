package matriculas.Code.backend.Service.Implementation;

import org.springframework.stereotype.Service;

import matriculas.Code.backend.Model.Responsable;
import matriculas.Code.backend.Repository.ResponsableRepository;
import matriculas.Code.backend.dto.Request.ResponsableRequest;
import matriculas.Code.backend.dto.Response.ResponsableResponse;

import java.util.List;

@Service
public class ResponsableImpl implements matriculas.Code.backend.Service.ResponsableService {

    private final ResponsableRepository responsableRepository;

    public ResponsableImpl(ResponsableRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    public List<ResponsableResponse> listarTodos() {
        return responsableRepository.findAll()
                .stream()
                .map(this::convertirAResponse)
                .toList();
    }

    public ResponsableResponse buscarPorId(Long id) {
        Responsable responsable = responsableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));

        return convertirAResponse(responsable);
    }

    public ResponsableResponse crear(ResponsableRequest request) {
        Responsable responsable = new Responsable();

        responsable.setDni(request.getDni());
        responsable.setNombre(request.getNombre());
        responsable.setApellido(request.getApellido());
        responsable.setTelefono(request.getTelefono());
        responsable.setOcupacion(request.getOcupacionProfesion());
        responsable.setNacionalidad(request.getNacionalidad());

        Responsable responsableGuardado = responsableRepository.save(responsable);

        return convertirAResponse(responsableGuardado);
    }

    public ResponsableResponse actualizar(Long id, ResponsableRequest request) {
        Responsable responsable = responsableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));

        responsable.setDni(request.getDni());
        responsable.setNombre(request.getNombre());
        responsable.setApellido(request.getApellido());
        responsable.setTelefono(request.getTelefono());
        responsable.setOcupacion(request.getOcupacionProfesion());
        responsable.setNacionalidad(request.getNacionalidad());

        Responsable responsableActualizado = responsableRepository.save(responsable);

        return convertirAResponse(responsableActualizado);
    }

    public void eliminar(Long id) {
        Responsable responsable = responsableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));

        responsableRepository.delete(responsable);
    }

    private ResponsableResponse convertirAResponse(Responsable responsable) {
        return new ResponsableResponse(
                responsable.getId(),
                responsable.getDni(),
                responsable.getNombre(),
                responsable.getApellido(),
                responsable.getTelefono(),
                responsable.getOcupacion(),
                responsable.getNacionalidad()
        );
    }
}