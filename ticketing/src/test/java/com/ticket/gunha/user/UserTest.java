package com.ticket.gunha.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@Rollback(value = false)
public class UserTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void 유저_생성(){
        //given
        User createUser = User.createUser("test1@email.com");
        //when
        Long joinId = userService.join(createUser);

        //then
        User findUser = userRepository.findById(joinId).get();
        Assertions.assertEquals(createUser,findUser);
    }
}
