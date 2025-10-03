<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 20)]
    private string $type = 'user'; // par défaut "user" ou "pro"

    #[ORM\Column(nullable: true)]
    private ?string $nom = null;

    #[ORM\Column(nullable: true)]
    private ?string $sirret = null;

    #[ORM\Column]
    private bool $isVerified = false;

    // Création d'un table associative via la relation many to many
    #[ORM\ManyToMany(targetEntity: ProfessionalInfo::class)]
    #[ORM\JoinTable(name: 'user_favorites')]
    private Collection $favorites;

    public function __construct()
    {
        $this->favorites = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getSirret(): ?string
    {
        return $this->sirret;
    }

    public function setSirret(?string $sirret): self
    {
        $this->sirret = $sirret;
        return $this;
    }


    /**
     * Ensure the session doesn't contain actual password hashes by CRC32C-hashing them, as supported since Symfony 7.3.
     */
    public function __serialize(): array
    {
        $data = (array) $this;
        $data["\0" . self::class . "\0password"] = hash('crc32c', $this->password);

        return $data;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?ProfessionalInfo $professionalInfo = null;

    // getter
    public function getProfessionalInfo(): ?ProfessionalInfo
    {
        return $this->professionalInfo;
    }

    // setter
    public function setProfessionalInfo(ProfessionalInfo $professionalInfo): self
    {
        $this->professionalInfo = $professionalInfo;
        return $this;
    }

    /** @return Collection<int, ProfessionalInfo> */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(ProfessionalInfo $pi): self
    {
        if (!$this->favorites->contains($pi)) {
            $this->favorites->add($pi);
            if (method_exists($pi, 'addFavoritedBy')) {
                $pi->addFavoritedBy($this);
            }
        }
        return $this;
    }
    public function removeFavorite(ProfessionalInfo $pi): self
    {
        if ($this->favorites->contains($pi)) {
            $this->favorites->removeElement($pi);
            if (method_exists($pi, 'removeFavoritedBy')) {
                $pi->removeFavoritedBy($this);
            }
        }
        return $this;
    }
    public function isFavorite(ProfessionalInfo $pi): bool
    {
        return $this->favorites->contains($pi);
    }
}
