<?php

namespace App\Tests\Entity;

use App\Entity\User;
use App\Entity\ProfessionalInfo;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        $this->user = new User();
    }

    // ============================================
    // Tests des propriétés de base
    // ============================================

    public function testIdIsNullByDefault(): void
    {
        $this->assertNull($this->user->getId());
    }

    public function testEmailCanBeSetAndRetrieved(): void
    {
        $email = 'test@example.com';
        $result = $this->user->setEmail($email);

        $this->assertSame($email, $this->user->getEmail());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testGetUserIdentifierReturnsEmail(): void
    {
        $email = 'user@example.com';
        $this->user->setEmail($email);

        $this->assertSame($email, $this->user->getUserIdentifier());
    }

    public function testGetUserIdentifierReturnsEmptyStringWhenEmailIsNull(): void
    {
        $this->assertSame('', $this->user->getUserIdentifier());
    }

    // ============================================
    // Tests des rôles
    // ============================================

    public function testRolesDefaultsToRoleUser(): void
    {
        $roles = $this->user->getRoles();

        $this->assertIsArray($roles);
        $this->assertContains('ROLE_USER', $roles);
        $this->assertCount(1, $roles);
    }

    public function testRolesCanBeSetAndRetrieved(): void
    {
        $roles = ['ROLE_ADMIN', 'ROLE_MODERATOR'];
        $result = $this->user->setRoles($roles);

        $returnedRoles = $this->user->getRoles();

        $this->assertContains('ROLE_USER', $returnedRoles);
        $this->assertContains('ROLE_ADMIN', $returnedRoles);
        $this->assertContains('ROLE_MODERATOR', $returnedRoles);
        $this->assertInstanceOf(User::class, $result);
    }

    public function testRolesAreUnique(): void
    {
        $this->user->setRoles(['ROLE_USER', 'ROLE_ADMIN', 'ROLE_USER']);
        $roles = $this->user->getRoles();

        $this->assertCount(2, $roles);
        $this->assertContains('ROLE_USER', $roles);
        $this->assertContains('ROLE_ADMIN', $roles);
    }

    // ============================================
    // Tests du mot de passe
    // ============================================

    public function testPasswordCanBeSetAndRetrieved(): void
    {
        $password = 'hashed_password_123';
        $result = $this->user->setPassword($password);

        $this->assertSame($password, $this->user->getPassword());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testPasswordIsNullByDefault(): void
    {
        $this->assertNull($this->user->getPassword());
    }

    // ============================================
    // Tests du type
    // ============================================

    public function testTypeDefaultsToUser(): void
    {
        $this->assertSame('user', $this->user->getType());
    }

    public function testTypeCanBeSetAndRetrieved(): void
    {
        $result = $this->user->setType('pro');

        $this->assertSame('pro', $this->user->getType());
        $this->assertInstanceOf(User::class, $result);
    }

    // ============================================
    // Tests du nom
    // ============================================

    public function testNomIsNullByDefault(): void
    {
        $this->assertNull($this->user->getNom());
    }

    public function testNomCanBeSetAndRetrieved(): void
    {
        $nom = 'Dupont';
        $result = $this->user->setNom($nom);

        $this->assertSame($nom, $this->user->getNom());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testNomCanBeSetToNull(): void
    {
        $this->user->setNom('Dupont');
        $this->user->setNom(null);

        $this->assertNull($this->user->getNom());
    }

    // ============================================
    // Tests du SIRET
    // ============================================

    public function testSirretIsNullByDefault(): void
    {
        $this->assertNull($this->user->getSirret());
    }

    public function testSirretCanBeSetAndRetrieved(): void
    {
        $siret = '12345678901234';
        $result = $this->user->setSirret($siret);

        $this->assertSame($siret, $this->user->getSirret());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testSirretCanBeSetToNull(): void
    {
        $this->user->setSirret('12345678901234');
        $this->user->setSirret(null);

        $this->assertNull($this->user->getSirret());
    }

    // ============================================
    // Tests de la vérification
    // ============================================

    public function testIsVerifiedIsFalseByDefault(): void
    {
        $this->assertFalse($this->user->isVerified());
    }

    public function testIsVerifiedCanBeSetAndRetrieved(): void
    {
        $result = $this->user->setIsVerified(true);

        $this->assertTrue($this->user->isVerified());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testIsVerifiedCanBeSetToFalse(): void
    {
        $this->user->setIsVerified(true);
        $this->user->setIsVerified(false);

        $this->assertFalse($this->user->isVerified());
    }

    // ============================================
    // Tests de ProfessionalInfo
    // ============================================

    public function testProfessionalInfoIsNullByDefault(): void
    {
        $this->assertNull($this->user->getProfessionalInfo());
    }

    public function testProfessionalInfoCanBeSetAndRetrieved(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $result = $this->user->setProfessionalInfo($professionalInfo);

        $this->assertSame($professionalInfo, $this->user->getProfessionalInfo());
        $this->assertInstanceOf(User::class, $result);
    }

    // ============================================
    // Tests des favoris
    // ============================================

    public function testFavoritesIsEmptyCollectionByDefault(): void
    {
        $favorites = $this->user->getFavorites();

        $this->assertInstanceOf(ArrayCollection::class, $favorites);
        $this->assertCount(0, $favorites);
    }

    public function testAddFavoriteAddsToCollection(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $professionalInfo->expects($this->once())
            ->method('addFavoritedBy')
            ->with($this->user);

        $result = $this->user->addFavorite($professionalInfo);

        $this->assertCount(1, $this->user->getFavorites());
        $this->assertTrue($this->user->getFavorites()->contains($professionalInfo));
        $this->assertInstanceOf(User::class, $result);
    }

    public function testAddFavoriteDoesNotAddDuplicates(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $professionalInfo->expects($this->once())
            ->method('addFavoritedBy')
            ->with($this->user);

        $this->user->addFavorite($professionalInfo);
        $this->user->addFavorite($professionalInfo);

        $this->assertCount(1, $this->user->getFavorites());
    }

    public function testAddFavoriteHandlesMissingAddFavoritedByMethod(): void
    {
        $professionalInfo = $this->getMockBuilder(ProfessionalInfo::class)
            ->disableOriginalConstructor()
            ->getMock();

        $result = $this->user->addFavorite($professionalInfo);

        $this->assertCount(1, $this->user->getFavorites());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testRemoveFavoriteRemovesFromCollection(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $professionalInfo->expects($this->once())
            ->method('addFavoritedBy')
            ->with($this->user);
        $professionalInfo->expects($this->once())
            ->method('removeFavoritedBy')
            ->with($this->user);

        $this->user->addFavorite($professionalInfo);
        $result = $this->user->removeFavorite($professionalInfo);

        $this->assertCount(0, $this->user->getFavorites());
        $this->assertFalse($this->user->getFavorites()->contains($professionalInfo));
        $this->assertInstanceOf(User::class, $result);
    }

    public function testRemoveFavoriteDoesNothingIfNotInCollection(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $professionalInfo->expects($this->never())
            ->method('removeFavoritedBy');

        $result = $this->user->removeFavorite($professionalInfo);

        $this->assertCount(0, $this->user->getFavorites());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testRemoveFavoriteHandlesMissingRemoveFavoritedByMethod(): void
    {
        $professionalInfo = $this->getMockBuilder(ProfessionalInfo::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->user->addFavorite($professionalInfo);
        $result = $this->user->removeFavorite($professionalInfo);

        $this->assertCount(0, $this->user->getFavorites());
        $this->assertInstanceOf(User::class, $result);
    }

    public function testIsFavoriteReturnsTrueWhenInCollection(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);
        $professionalInfo->method('addFavoritedBy');

        $this->user->addFavorite($professionalInfo);

        $this->assertTrue($this->user->isFavorite($professionalInfo));
    }

    public function testIsFavoriteReturnsFalseWhenNotInCollection(): void
    {
        $professionalInfo = $this->createMock(ProfessionalInfo::class);

        $this->assertFalse($this->user->isFavorite($professionalInfo));
    }

    public function testMultipleFavoritesCanBeAdded(): void
    {
        $pi1 = $this->createMock(ProfessionalInfo::class);
        $pi1->method('addFavoritedBy');
        
        $pi2 = $this->createMock(ProfessionalInfo::class);
        $pi2->method('addFavoritedBy');
        
        $pi3 = $this->createMock(ProfessionalInfo::class);
        $pi3->method('addFavoritedBy');

        $this->user->addFavorite($pi1);
        $this->user->addFavorite($pi2);
        $this->user->addFavorite($pi3);

        $this->assertCount(3, $this->user->getFavorites());
        $this->assertTrue($this->user->isFavorite($pi1));
        $this->assertTrue($this->user->isFavorite($pi2));
        $this->assertTrue($this->user->isFavorite($pi3));
    }

    // ============================================
    // Tests de la sérialisation
    // ============================================

    public function testSerializeHashesPassword(): void
    {
        $password = 'my_secure_password';
        $this->user->setPassword($password);

        $serialized = $this->user->__serialize();

        $this->assertIsArray($serialized);
        $passwordKey = "\0" . User::class . "\0password";
        $this->assertArrayHasKey($passwordKey, $serialized);
        $this->assertNotSame($password, $serialized[$passwordKey]);
        $this->assertSame(hash('crc32c', $password), $serialized[$passwordKey]);
    }

    // ============================================
    // Tests de eraseCredentials
    // ============================================

    public function testEraseCredentialsDoesNothing(): void
    {
        $password = 'test_password';
        $this->user->setPassword($password);
        
        $this->user->eraseCredentials();
        
        // Le mot de passe ne devrait pas être effacé
        $this->assertSame($password, $this->user->getPassword());
    }

    // ============================================
    // Test d'intégration complet
    // ============================================

    public function testCompleteUserWorkflow(): void
    {
        // Configuration d'un utilisateur complet
        $this->user->setEmail('pro@example.com');
        $this->user->setPassword('hashed_password');
        $this->user->setType('pro');
        $this->user->setNom('Entreprise Pro');
        $this->user->setSirret('12345678901234');
        $this->user->setRoles(['ROLE_ADMIN']);
        $this->user->setIsVerified(true);

        // Ajout de favoris
        $pi1 = $this->createMock(ProfessionalInfo::class);
        $pi1->method('addFavoritedBy');
        $pi2 = $this->createMock(ProfessionalInfo::class);
        $pi2->method('addFavoritedBy');

        $this->user->addFavorite($pi1);
        $this->user->addFavorite($pi2);

        // Vérifications
        $this->assertSame('pro@example.com', $this->user->getEmail());
        $this->assertSame('pro@example.com', $this->user->getUserIdentifier());
        $this->assertSame('hashed_password', $this->user->getPassword());
        $this->assertSame('pro', $this->user->getType());
        $this->assertSame('Entreprise Pro', $this->user->getNom());
        $this->assertSame('12345678901234', $this->user->getSirret());
        $this->assertTrue($this->user->isVerified());
        $this->assertContains('ROLE_ADMIN', $this->user->getRoles());
        $this->assertContains('ROLE_USER', $this->user->getRoles());
        $this->assertCount(2, $this->user->getFavorites());
        $this->assertTrue($this->user->isFavorite($pi1));
        $this->assertTrue($this->user->isFavorite($pi2));
    }
}