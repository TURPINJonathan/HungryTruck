<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"email"}, message="It looks like your already have an account!")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"foodtruck_get","user_get_by_id","pro_get_by_id","foodtruck_post","created_user","delete_user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"foodtruck_get","user_get_by_id","pro_get_by_id","foodtruck_post","foodtruckevent_post","created_user","delete_user"})
     * @Assert\NotBlank
     * @Assert\Email
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Assert\Count(min=1, max=1)
     * @Groups({"user_get_by_id","pro_get_by_id","foodtruck_post","foodtruckevent_post","created_user","delete_user"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     * @Assert\Regex("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-\/])[A-Za-z\d@$!%*#?&-\/]{8,20}$/", message="Votre mot de passe doit contenir au moins un caractère minuscle, un caractère majuscule, un chiffre, un signe spécial de @#-_$%^&+=§ !? et entre 8 et 20 caractères")
     * @Assert\NotCompromisedPassword
     * @Groups({"created_user","delete_user"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\Length( min=4,max=70)
     * @Assert\NotBlank
     * @Groups({"foodtruck_get","user_get_by_id","pro_get_by_id","foodtruck_post","event_post","created_user","delete_user"})
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(max=255)
     * @Assert\Url
     * @Groups({"user_get_by_id","pro_get_by_id","event_post","created_user","delete_user"})
     */
    private $avatar;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=1,max=255)
     * @Assert\NotBlank
     * @Groups({"user_get_by_id","pro_get_by_id","event_post","created_user","delete_user"})
     */
    private $adresse;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(max=18)
     * @Groups({"foodtruck_get","pro_get_by_id","event_post","created_user","delete_user"})
     */
    private $siret;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_get_by_id","pro_get_by_id","event_post","created_user","delete_user"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_get_by_id","pro_get_by_id","event_post","created_user","delete_user"})
     */
    private $latitude;

    /**
     * @ORM\OneToMany(targetEntity=Foodtruck::class, mappedBy="user", cascade={"persist", "remove" })
     * @Groups({"pro_get_by_id","delete_user","delete_foodtruck"})
     */
    private $truck_id;

    /**
     * @ORM\ManyToMany(targetEntity=CategoryFood::class, inversedBy="users",cascade={"persist"})
     * @Groups({"user_get_by_id","event_post","pro_get_by_id","created_user","delete_user"})
     */
    private $food_like;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;


    
    public function __construct()
    {
        $this->createdAt = new DateTime();
        $this->truck_id = new ArrayCollection();
        $this->food_like = new ArrayCollection();
        $this->updatedAt = new DateTime();
    }

    public function __toString()
    {
        return $this->getPseudo();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
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
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
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
        //$roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    /**
     * @return Collection|Foodtruck[]
     */
    public function getTruckId(): Collection
    {
        return $this->truck_id;
    }

    public function addTruckId(Foodtruck $truckId): self
    {
        if (!$this->truck_id->contains($truckId)) {
            $this->truck_id[] = $truckId;
            $truckId->setUser($this);
        }

        return $this;
    }

    public function removeTruckId(Foodtruck $truckId): self
    {
        if ($this->truck_id->removeElement($truckId)) {
            // set the owning side to null (unless already changed)
            if ($truckId->getUser() === $this) {
                $truckId->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CategoryFood[]
     */
    public function getFoodLike(): Collection
    {
        return $this->food_like;
    }

    public function addFoodLike(CategoryFood $foodLike): self
    {
        if (!$this->food_like->contains($foodLike)) {
            $this->food_like[] = $foodLike;
        }

        return $this;
    }

    public function removeFoodLike(CategoryFood $foodLike): self
    {
        $this->food_like->removeElement($foodLike);

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }
}
