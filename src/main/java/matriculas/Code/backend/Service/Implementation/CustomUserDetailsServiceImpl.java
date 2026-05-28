package matriculas.Code.backend.Service.Implementation;

import matriculas.Code.backend.Model.Usuario;
import matriculas.Code.backend.Repository.UsuarioRepository;
import matriculas.Code.backend.Service.CustomUserDetailsService;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getRol())
                .disabled(!Boolean.TRUE.equals(usuario.getActivo()))
                .build();
    }
}