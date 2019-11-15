<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NotificationRepository")
 */
class Notification
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $suject;



    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Medicament", inversedBy="Notification")
     */
    private $medi;

    public function __construct()
    {
        $this->medicament = new ArrayCollection();
        $this->Medicament = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSuject(): ?string
    {
        return $this->suject;
    }

    public function setSuject(string $suject): self
    {
        $this->suject = $suject;

        return $this;
    }




    public function getMedi(): ?Medicament
    {
        return $this->medi;
    }

    public function setMedi(?Medicament $medi): self
    {
        $this->medi = $medi;

        return $this;
    }
}
