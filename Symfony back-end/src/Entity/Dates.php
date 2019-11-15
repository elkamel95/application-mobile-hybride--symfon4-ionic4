<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DatesRepository")
 */
class Dates
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $dateComprime;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Comprime", mappedBy="date",cascade={"persist"})
     */
    private $comprimes;

    public function __construct()
    {
        $this->comprimes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateComprime(): ?\DateTimeInterface
    {
        return $this->dateComprime;
    }

    public function setDateComprime(\DateTimeInterface $dateComprime): self
    {
        $this->dateComprime = $dateComprime;

        return $this;
    }

    /**
     * @return Collection|Comprime[]
     */
    public function getComprimes(): Collection
    {
        return $this->comprimes;
    }

    public function addComprime(Comprime $comprime): self
    {
        if (!$this->comprimes->contains($comprime)) {
            $this->comprimes[] = $comprime;
            $comprime->addDate($this);
        }

        return $this;
    }

    public function removeComprime(Comprime $comprime): self
    {
        if ($this->comprimes->contains($comprime)) {
            $this->comprimes->removeElement($comprime);
            $comprime->removeDate($this);
        }

        return $this;
    }
}
