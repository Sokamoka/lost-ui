<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useShowPassword, useValidation } from '@lostui/utils'
import { Eye } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

const formElement = ref<HTMLFormElement | null>(null)

const form = reactive({
  name: '',
  email: '',
  userName: '',
  password: '',
  address: {
    street: '',
    city: '',
  },
})

const { toast } = useToast()

const { type, toggle } = useShowPassword()

const { errors, hasError, onUpdate, getErrorMessage, reset, validate }
  = useValidation(formElement)

// const scrollTo = useScrollToError({ offset: 40 });

async function onSubmit() {
  const valid = await validate()
  // if (!valid) return scrollTo();
  if (!valid)
    return
  toast({
    title: 'Register Success',
  })
}

function onReset() {
  formElement.value?.reset()
  reset()
}
</script>

<template>
  <Card class="w-[350px] mx-auto">
    <form ref="formElement" novalidate @submit.prevent="onSubmit">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Register user </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid items-center w-full gap-4">
          <section class="flex flex-col space-y-1.5 group">
            <Label for="name" :class="{ 'text-red-500': hasError('name') }">Name</Label>
            <Input
              id="name"
              v-model="form.name"
              name="name"
              placeholder="Name of your project"
              :class="{
                'border-red-500 bg-red-50 text-red-500': hasError('name'),
              }"
              maxlength="12"
              minlength="6"
              required
              :aria-invalid="hasError('name')"
              @input="onUpdate"
            />
            <div v-if="hasError('name')" class="text-red-500 text-xs">
              {{ getErrorMessage("name") }}
            </div>
          </section>

          <section class="flex flex-col space-y-1.5">
            <Label for="email" :class="{ 'text-red-500 ': hasError('email') }">E-mail</Label>
            <Input
              id="email"
              v-model="form.email"
              name="email"
              placeholder="E-mail"
              type="email"
              :class="{
                'border-red-500 bg-red-50 text-red-500': hasError('email'),
              }"
              :aria-invalid="hasError('email')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('email')" class="text-red-500 text-xs">
              {{ getErrorMessage("email") }}
            </div>
          </section>

          <section class="flex flex-col space-y-1.5">
            <Label for="password" :class="{ 'text-red-500 ': hasError('password') }">Password</Label>
            <div class="relative w-full max-w-sm items-center">
              <Input
                id="password"
                v-model="form.password"
                name="password"
                placeholder="Password"
                :type="type"
                :class="{
                  'border-red-500 bg-red-50 text-red-500': hasError('password'),
                }"
                :aria-invalid="hasError('password')"
                required
                @input="onUpdate"
              />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2" @click="toggle()">
                <Eye :class="[type === 'password' ? 'opacity-40' : 'opacity-100']" />
              </span>
            </div>
            <div v-if="hasError('password')" class="text-red-500 text-xs">
              {{ getErrorMessage("password") }}
            </div>
          </section>

          <h2 class="text-md font-bold">
            Address
          </h2>
          <section class="flex flex-col space-y-1.5">
            <Label
              for="street"
              :class="{ 'text-red-500 ': hasError('address.street') }"
            >Street</Label>
            <Input
              id="street"
              v-model="form.address.street"
              name="address.street"
              placeholder="Street"
              :class="{
                'border-red-500 bg-red-50': hasError('address.street'),
              }"
              :aria-invalid="hasError('address.street')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('address.street')" class="text-red-500 text-xs">
              {{ getErrorMessage("address.street") }}
            </div>
          </section>

          <section class="flex flex-col space-y-1.5">
            <Label
              for="city"
              :class="{ 'text-red-500 ': hasError('address.city') }"
            >City</Label>
            <Input
              id="city"
              v-model="form.address.city"
              name="address.city"
              placeholder="City"
              :class="{ 'border-red-500 bg-red-50': hasError('address.city') }"
              :aria-invalid="hasError('address.city')"
              required
              @input="onUpdate"
            />
            <div v-if="hasError('address.city')" class="text-red-500 text-xs">
              {{ getErrorMessage("address.city") }}
            </div>
          </section>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button type="button" variant="outline" @click="onReset">
          Reset
        </Button>
        <Button type="submit">
          Register
        </Button>
      </CardFooter>
    </form>
  </Card>
  <!-- <pre>{{ form }}</pre> -->
  <pre>{{ errors }}</pre>
</template>
