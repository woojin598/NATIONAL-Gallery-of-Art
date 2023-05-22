package kr.co.tj.cartservice.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.dto.CartDTO;
import kr.co.tj.dto.CartEntity;

public interface CartRepository  extends JpaRepository<CartEntity, Long>{



    @Override
    CartEntity save(CartEntity cartEntity);

    @Override
    void delete(CartEntity cartEntity);
    
    @Override
    List<CartEntity> findAll();
    
    @Override
    Optional<CartEntity> findById(Long itemId);

    @Override
    void deleteAll();
	

}
