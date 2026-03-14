package in.natwest.user.repository;

import in.natwest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserProfileRepository extends JpaRepository<User,Integer> {
    boolean existsByName(String name);//checking the existence by name
    Optional<User> findByName(String name);
    @Query("select u from User u where u.name=?1")//first parameter
    Optional<User> getUserByName(String name);///all 3 same function but diff ways
}
