package com.ticket.gunha.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Rollback
public class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("유저 생성 테스트")
    void 유저_생성(){
        //given
        User createUser = User.createUser("test1@email.com");
        //when
        Long joinId = userService.join(createUser);

        //then
        User findUser = userRepository.findById(joinId).get();
        Assertions.assertEquals(createUser,findUser);
    }

    @Test
    @DisplayName("중복된 유저 생성 시 IllegalStateException 발생 테스트")
    void 중복된_유저_생성(){
        //given
        User createUser = User.createUser("test1@email.com");
        userService.join(createUser);

        // when, then
        Assertions.assertThrows(IllegalStateException.class, () -> {
            userService.join(createUser);
        });
    }
}
