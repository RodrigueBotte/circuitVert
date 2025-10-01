<?php

namespace App\Entity;

use App\Repository\ProfessionalInfoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfessionalInfoRepository::class)]
class ProfessionalInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nameSociety = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    private ?array $photos = null;

    #[ORM\Column(nullable: true)]
    private ?array $payment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameSociety(): ?string
    {
        return $this->nameSociety;
    }

    public function setNameSociety(string $nameSociety): static
    {
        $this->nameSociety = $nameSociety;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPhotos(): ?array
    {
        return $this->photos;
    }

    public function setPhotos(?array $photos): static
    {
        $this->photos = $photos;

        return $this;
    }

    public function getPayment(): ?array
    {
        return $this->payment;
    }

    public function setPayment(?array $payment): static
    {
        $this->payment = $payment;

        return $this;
    }

    #[ORM\OneToOne(inversedBy: 'professionalInfo', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    // getter
    public function getUser(): ?User
    {
        return $this->user;
    }

    // setter
    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }
}